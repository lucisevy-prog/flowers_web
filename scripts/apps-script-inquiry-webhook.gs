/**
 * LU by Lucie — poptávkový formulář → Google Sheets + Gmail notifikace.
 *
 * Tohle NENÍ součástí buildu webu — je to referenční kopie skriptu, který se
 * ručně vkládá do Apps Scriptu napojeného na Google Sheet. Web na něj volá
 * jako na webhook (viz src/lib/contact.functions.ts).
 *
 * Skript zapisuje podle NÁZVU SLOUPCE v prvním řádku tabulky (ne podle
 * pořadí) — takže si mezi ně můžeš kdykoli přidat vlastní interní sloupce
 * (např. "Stav", "Poznámka", "Zaplaceno") a script je nechá být. Sloupce,
 * které nejsou v seznamu COLUMNS níže (typicky "Dny do akce" — výpočetní,
 * "Stav", "Místo konání", "Cena", "Záloha", "Doplatek", "Poznámka"),
 * skript vůbec nezapisuje.
 *
 * Aktuální názvy hlaviček (podle reálné tabulky klientky, ověřeno
 * 2026-08-21) jsou v poli COLUMNS níže. Pokud si Lucie hlavičku sloupce
 * v tabulce přejmenuje, je potřeba stejně přejmenovat i řetězec v COLUMNS,
 * jinak se daná hodnota přestane zapisovat (script jen zaloguje chybu,
 * zápis ostatních sloupců i uložení řádku to neshodí).
 *
 * Nasazení:
 * 1. Otevři Google Sheet, kam se mají poptávky ukládat (musí už mít v
 *    prvním řádku hlavičky, jak jsou uvedené v COLUMNS níže).
 * 2. Rozšíření → Apps Script. Smaž výchozí obsah Code.gs a vlož tento skript.
 * 3. Níže doplň SHARED_SECRET (stejná hodnota, kterou dostaneš jako
 *    INQUIRY_SHEET_WEBHOOK_SECRET) a případně NOTIFY_EMAIL.
 * 4. Nasadit → Nové nasazení → typ "Webová aplikace".
 *    - Spustit jako: Já (tvůj Google účet)
 *    - Kdo má přístup: Kdokoli
 * 5. Zkopíruj URL webové aplikace (končí na /exec) a pošli ji jako
 *    INQUIRY_SHEET_WEBHOOK_URL.
 * 6. Při každé změně skriptu je potřeba udělat "Nové nasazení" znovu
 *    (Apps Script needs a new deployment version to pick up code changes).
 *
 * DŮLEŽITÉ — odesílatel e-mailů: MailApp.sendEmail vždy posílá jako ten
 * Google účet, který script autorizoval/nasadil ("Spustit jako: Já"), bez
 * ohledu na to, co je v kódu — `name` níže mění jen zobrazované jméno
 * ("LU by Lucie <tvuj-ucet@gmail.com>"), ne skutečnou adresu odesílatele.
 * Pokud má komunikace s klienty chodit z lubyluci.studio@gmail.com, jsou
 * dvě reálné možnosti:
 *  a) Sheet + Apps Script vlastnit/autorizovat přímo z účtu
 *     lubyluci.studio@gmail.com (nejjednodušší, doporučeno), nebo
 *  b) v Gmailu osobního účtu nastavit lubyluci.studio@gmail.com jako
 *     ověřenou "Send mail as" alias adresu (Nastavení → Účty a import →
 *     Odesílat poštu jako) a pak níže v sendEmail() doplnit
 *     `from: "lubyluci.studio@gmail.com"` — bez ověřené aliasy tohle
 *     odeslání e-mailu rovnou shodí chybou.
 */

const SHARED_SECRET = "REPLACE_ME"; // musí být identická s INQUIRY_SHEET_WEBHOOK_SECRET
const NOTIFY_EMAIL = "lubyluci.studio@gmail.com";

// Datum akce chodí z webu jako "YYYY-MM-DD" (input type="date"). Zapisujeme
// ho jako skutečné datum (ne text), aby na něm fungoval případný vzorec
// v sloupci "Dny do akce" (např. =F2-DNES()).
function parseEventDate(value) {
  if (!value) return "";
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? value : d;
}

// Název sloupce v tabulce → jak se hodnota získá z poptávky.
// Sloupce, které tu nejsou (interní i "Dny do akce"), skript nikdy nezapisuje.
const COLUMNS = [
  { header: "Datum poptávky", value: () => new Date() },
  { header: "Jméno", value: (p) => p.name || "" },
  { header: "Email", value: (p) => p.email || "" },
  { header: "Telefon", value: (p) => p.phone || "" },
  { header: "Datum akce", value: (p) => parseEventDate(p.eventDate) },
  { header: "Zážitek", value: (p) => p.experience || "" },
  { header: "Typ akce", value: (p) => p.occasion || "" },
  { header: "Počet osob", value: (p) => p.guestCount || "" },
  { header: "Lokalita", value: (p) => p.location || "" },
  { header: "Zpráva klienta", value: (p) => p.message || "" },
];

function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: "invalid_json" });
  }

  if (payload.secret !== SHARED_SECRET) {
    return jsonResponse({ ok: false, error: "unauthorized" });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Tabulka už má hlavičku hotovou (viz COLUMNS výše) — script ji nikdy
  // sám nezakládá ani nepřepisuje, jen do ní podle názvů sloupců zapisuje.
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const newRow = sheet.getLastRow() + 1;

  COLUMNS.forEach(({ header, value }) => {
    const colIndex = headerRow.indexOf(header) + 1; // 0 = not found
    if (colIndex > 0) {
      sheet.getRange(newRow, colIndex).setValue(value(payload));
    } else {
      console.error('Sloupec "' + header + '" nebyl v tabulce nalezen, hodnota se nezapsala.');
    }
  });

  // The sheet row is the record of truth — a broken/quota-limited mail send
  // must not look like a failed submission, so this is a soft best-effort.
  try {
    const lines = [
      "Jméno: " + (payload.name || ""),
      "E-mail: " + (payload.email || ""),
      payload.phone ? "Telefon: " + payload.phone : null,
      payload.eventDate ? "Datum akce: " + payload.eventDate : null,
      payload.experience ? "Typ zážitku: " + payload.experience : null,
      payload.occasion ? "Typ akce: " + payload.occasion : null,
      payload.guestCount ? "Předpokládaný počet hostů: " + payload.guestCount : null,
      payload.location ? "Lokalita: " + payload.location : null,
      payload.message ? "\nŘekněte mi víc:\n" + payload.message : null,
    ].filter(Boolean);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: payload.email || NOTIFY_EMAIL,
      name: "LU by Lucie",
      subject: "Nová poptávka od " + (payload.name || "?"),
      body: lines.join("\n"),
    });
  } catch (err) {
    console.error("Inquiry saved but notification email failed: " + err);
  }

  // Confirmation email back to the customer — separate try/catch so a
  // failure here (e.g. invalid address) never masks the successful save
  // above or blocks the internal notification.
  if (payload.email) {
    try {
      MailApp.sendEmail({
        to: payload.email,
        name: "LU by Lucie",
        subject: "Vaše poptávka dorazila — brzy se ozveme 🌸",
        body:
          "Dobrý den,\n\n" +
          "děkujeme za váš zájem o květinové zážitky LU.\n\n" +
          "Vaše poptávka nám dorazila a my se vám ozveme do 24 hodin s potvrzením dostupnosti termínu a dalšími informacemi k rezervaci.\n\n" +
          "Než se ozveme, připomínáme, jak celý proces funguje:\n" +
          "1. Potvrzení termínu — do 24 hodin vám napíšeme, zda je váš termín volný.\n" +
          "2. Záloha — termín je závazně rezervován až po připsání zálohy 50 % z celkové ceny na náš účet.\n" +
          "3. Doplatek — zbývající částku hradíte nejpozději 7 dní před akcí.\n\n" +
          "Těšíme se na společný zážitek.\n" +
          "LU by Lucie — Květinové zážitky\n" +
          "lubyluci.studio@gmail.com · 777 992 589 · www.lubyluci.cz",
      });
    } catch (err) {
      console.error("Inquiry saved but customer confirmation email failed: " + err);
    }
  }

  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
