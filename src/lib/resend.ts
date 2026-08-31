// Potvrzovací e-mail zákazníkovi po odeslání poptávky, přes Resend
// (resend.com). Bez SDK balíčku — je to jediné volání, stačí syrový fetch
// na jejich REST API.
//
// Vyžaduje ověřenou doménu na Resend straně (Domains → lubyluci.cz → přidat
// DNS záznamy u WEDOSu), jinak Resend odmítne poslat komukoli mimo účet,
// který si klíč vytvořil. Do té doby tahle funkce v produkci jen zaloguje
// chybu a mlčky se vzdá — nikdy nesmí shodit samotné uložení poptávky do
// Sheets, to je ta část, na které záleží.

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_ADDRESS = "LU by Lucie <poptavky@lubyluci.cz>";

export async function sendInquiryConfirmationEmail(name: string, email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("sendInquiryConfirmationEmail: RESEND_API_KEY is not set — skipping.");
    return;
  }

  const firstName = name.trim().split(/\s+/)[0] || "";
  const greeting = firstName ? `Dobrý den, ${firstName},` : "Dobrý den,";

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: email,
      subject: "Vaše poptávka dorazila — brzy se ozveme 🌸",
      html: buildConfirmationHtml(greeting),
      text: buildConfirmationText(greeting),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API failed: ${response.status} ${await response.text()}`);
  }
}

function buildConfirmationText(greeting: string): string {
  return [
    greeting,
    "",
    "děkujeme za váš zájem o květinové zážitky LU.",
    "",
    "Vaše poptávka nám dorazila a my se vám ozveme do 24 hodin s potvrzením dostupnosti termínu a dalšími informacemi k rezervaci.",
    "",
    "Než se ozveme, připomínáme, jak celý proces funguje:",
    "1. Potvrzení termínu — do 24 hodin vám napíšeme, zda je váš termín volný.",
    "2. Záloha — termín je závazně rezervován až po připsání zálohy 50 % z celkové ceny na náš účet.",
    "3. Doplatek — zbývající částku hradíte nejpozději 7 dní před akcí.",
    "",
    "Těšíme se na společný zážitek.",
    "LU by Lucie — Květinové zážitky",
    "lubyluci.studio@gmail.com · 777 992 589 · www.lubyluci.cz",
  ].join("\n");
}

function buildConfirmationHtml(greeting: string): string {
  const p = (text: string) =>
    `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#3e2d26;">${text}</p>`;
  return `
    <div style="max-width:520px;margin:0 auto;padding:32px 24px;background:#f6f0eb;">
      ${p(greeting)}
      ${p("děkujeme za váš zájem o květinové zážitky LU.")}
      ${p("Vaše poptávka nám dorazila a my se vám ozveme do 24 hodin s potvrzením dostupnosti termínu a dalšími informacemi k rezervaci.")}
      ${p("Než se ozveme, připomínáme, jak celý proces funguje:")}
      ${p("1. <strong>Potvrzení termínu</strong> — do 24 hodin vám napíšeme, zda je váš termín volný.<br>2. <strong>Záloha</strong> — termín je závazně rezervován až po připsání zálohy 50&nbsp;% z celkové ceny na náš účet.<br>3. <strong>Doplatek</strong> — zbývající částku hradíte nejpozději 7 dní před akcí.")}
      ${p("Těšíme se na společný zážitek.<br><strong>LU by Lucie</strong> — Květinové zážitky<br>lubyluci.studio@gmail.com · 777&nbsp;992&nbsp;589 · www.lubyluci.cz")}
    </div>
  `.trim();
}
