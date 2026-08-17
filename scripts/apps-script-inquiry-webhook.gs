/**
 * LU by Lucie — poptávkový formulář → Google Sheets + Gmail notifikace.
 *
 * Tohle NENÍ součástí buildu webu — je to referenční kopie skriptu, který se
 * ručně vkládá do Apps Scriptu napojeného na Google Sheet. Web na něj volá
 * jako na webhook (viz src/lib/contact.functions.ts).
 *
 * Nasazení:
 * 1. Vytvoř (nebo otevři) Google Sheet, kam se mají poptávky ukládat.
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
 */

const SHARED_SECRET = "REPLACE_ME"; // musí být identická s INQUIRY_SHEET_WEBHOOK_SECRET
const NOTIFY_EMAIL = "lubyluci.studio@gmail.com";

const HEADERS = [
  "Čas",
  "Jméno",
  "E-mail",
  "Telefon",
  "Datum akce",
  "Typ zážitku",
  "Příležitost",
  "Počet hostů",
  "Lokalita",
  "Zpráva",
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
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  sheet.appendRow([
    new Date(),
    payload.name || "",
    payload.email || "",
    payload.phone || "",
    payload.eventDate || "",
    payload.experience || "",
    payload.occasion || "",
    payload.guestCount || "",
    payload.location || "",
    payload.message || "",
  ]);

  // The sheet row is the record of truth — a broken/quota-limited mail send
  // must not look like a failed submission, so this is a soft best-effort.
  try {
    const lines = [
      "Jméno: " + (payload.name || ""),
      "E-mail: " + (payload.email || ""),
      payload.phone ? "Telefon: " + payload.phone : null,
      payload.eventDate ? "Datum akce: " + payload.eventDate : null,
      payload.experience ? "Typ zážitku: " + payload.experience : null,
      payload.occasion ? "Příležitost: " + payload.occasion : null,
      payload.guestCount ? "Počet hostů: " + payload.guestCount : null,
      payload.location ? "Lokalita: " + payload.location : null,
      payload.message ? "\nZpráva:\n" + payload.message : null,
    ].filter(Boolean);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: payload.email || NOTIFY_EMAIL,
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
