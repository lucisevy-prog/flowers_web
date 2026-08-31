// Zápis poptávek přímo do Google Sheets přes servisní účet (Service Account),
// bez prostředníka v podobě Apps Scriptu — servisní účet má vlastní e-mail
// (…@…iam.gserviceaccount.com) a klíč, žádné "Kdo má přístup" ani "Provést
// jako" nastavení, na kterých by se to dalo rozbít. Jediné, co je potřeba
// udělat na Google straně: sdílet cílový Sheet s e-mailem servisního účtu
// jako Editor (viz README v scripts/).
//
// Implementováno bez googleapis balíčku (zbytečně velký pro jediné volání) —
// jen ruční OAuth2 service-account JWT flow (podepsaný Node's `crypto`) a
// syrová volání Sheets API v4 přes fetch.

import { createSign } from "node:crypto";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

// Sloupce, které skript zapisuje — název hlavičky (musí přesně sedět s
// prvním řádkem tabulky) → jak se hodnota získá z poptávky. Cokoliv v
// tabulce navíc (Stav, Dny do akce, Místo konání, Cena, Záloha, Doplatek,
// Poznámka) je čistě interní a nikdy se sem nezapisuje.
const COLUMNS: { header: string; value: (p: InquiryPayload) => string }[] = [
  { header: "Datum poptávky", value: () => formatCzechDateTime(new Date()) },
  { header: "Jméno", value: (p) => p.name || "" },
  { header: "Email", value: (p) => p.email || "" },
  { header: "Telefon", value: (p) => p.phone || "" },
  { header: "Datum akce", value: (p) => formatCzechDate(p.eventDate) },
  { header: "Zážitek", value: (p) => p.experience || "" },
  { header: "Typ akce", value: (p) => p.occasion || "" },
  { header: "Počet osob", value: (p) => p.guestCount || "" },
  { header: "Lokalita", value: (p) => p.location || "" },
  { header: "Zpráva klienta", value: (p) => p.message || "" },
];

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  experience: string;
  occasion: string;
  guestCount: string;
  location: string;
  message: string;
};

// "YYYY-MM-DD" (z <input type="date">) -> "DD.MM.RRRR", jak to čte česká
// lokalizace Sheets pod USER_ENTERED. Prázdné/neplatné necháváme prázdné,
// ať tam nepíšeme nesmysl.
function formatCzechDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return "";
  const [, y, mo, d] = m;
  return `${d}.${mo}.${y}`;
}

function formatCzechDateTime(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${d}.${mo}.${y} ${h}:${mi}:${s}`;
}

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Krátkodobě cachovaný access token — přežije mezi requesty na teplé
// serverless instanci, ať nemusíme podepisovat nový JWT při každé poptávce.
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token;
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      iat: nowSec,
      exp: nowSec + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;

  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  // Servisní účty distribuují klíč s doslovnými "\n" v env proměnné —
  // musí se rozbalit na skutečné nové řádky, jinak PEM parser klíč odmítne.
  const signature = base64url(signer.sign(privateKey.replace(/\\n/g, "\n")));
  const jwt = `${unsigned}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Google OAuth token exchange failed: ${response.status} ${await response.text()}`,
    );
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

// Písmeno sloupce (0 = A, 25 = Z, 26 = AA, ...) — tabulka má 17 sloupců,
// takže jednopísmenná abeceda bohatě stačí, ale počítáme to obecně.
function columnLetter(index: number): string {
  let n = index + 1;
  let letters = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    letters = String.fromCharCode(65 + rem) + letters;
    n = Math.floor((n - 1) / 26);
  }
  return letters;
}

async function sheetsRequest(path: string, token: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`Sheets API ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.json();
}

export async function appendInquiryRow(payload: InquiryPayload): Promise<void> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY / GOOGLE_SHEET_ID not set.",
    );
  }

  const token = await getAccessToken(clientEmail, privateKey);

  // První list tabulky, ať se jmenuje jakkoliv — nespoléháme na natvrdo
  // zadaný název "Sheet1"/"List 2".
  const meta = (await sheetsRequest(`${sheetId}?fields=sheets.properties.title`, token)) as {
    sheets: { properties: { title: string } }[];
  };
  const sheetName = meta.sheets[0]?.properties.title;
  if (!sheetName) throw new Error("Sheets API: no sheet found in the spreadsheet.");
  const escapedSheetName = sheetName.includes("'") ? sheetName.replace(/'/g, "''") : sheetName;
  const quotedSheet = `'${escapedSheetName}'`;

  const headerData = (await sheetsRequest(
    `${sheetId}/values/${encodeURIComponent(`${quotedSheet}!1:1`)}`,
    token,
  )) as { values?: string[][] };
  const headerRow = headerData.values?.[0] ?? [];

  const colData = (await sheetsRequest(
    `${sheetId}/values/${encodeURIComponent(`${quotedSheet}!A:A`)}`,
    token,
  )) as { values?: string[][] };
  const nextRow = (colData.values?.length ?? 0) + 1;

  const data = COLUMNS.map(({ header, value }) => {
    const colIndex = headerRow.indexOf(header);
    if (colIndex === -1) {
      console.error(`appendInquiryRow: column "${header}" not found in sheet header row.`);
      return null;
    }
    return {
      range: `${quotedSheet}!${columnLetter(colIndex)}${nextRow}`,
      values: [[value(payload)]],
    };
  }).filter((entry): entry is { range: string; values: string[][] } => entry !== null);

  if (data.length === 0) return;

  await sheetsRequest(`${sheetId}/values:batchUpdate`, token, {
    method: "POST",
    body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
  });
}
