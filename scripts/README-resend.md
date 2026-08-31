# Potvrzovací e-mail zákazníkovi → Resend

Po úspěšném zápisu poptávky do Sheets web pošle zákazníkovi automatický
potvrzovací e-mail ("Vaše poptávka dorazila — brzy se ozveme 🌸") přes
[Resend](https://resend.com). Kód je v
[`src/lib/resend.ts`](../src/lib/resend.ts), volá ho
[`src/lib/contact.functions.ts`](../src/lib/contact.functions.ts) — je to
čistě best-effort krok až **po** úspěšném uložení do Sheets, takže selhání
e-mailu nikdy nezpůsobí, že by poptávka "propadla".

## Účet a API klíč (hotovo)

Účet je založený pod `luci.sevy@gmail.com`, API klíč vygenerovaný. Klíč jde
na Vercel jako proměnná prostředí `RESEND_API_KEY` (Project Settings →
Environment Variables) — po uložení je potřeba nový deploy.

## Ověření domény (zatím čeká na DNS)

Resend bez ověřené domény umí posílat jen na e-mail, kterým je účet
zaregistrovaný — ne skutečným zákazníkům. Ověření:

1. Na Resend v levém menu **Domains → Add Domain** → `lubyluci.cz`
2. Zobrazí se seznam DNS záznamů (typicky pár TXT + MX/CNAME pro
   SPF/DKIM/DMARC) — tyhle záznamy se přidávají **u WEDOSu** ve stejném kroku,
   kdy nastavujeme DNS pro samotný web (viz hlavní úkoly projektu).
3. Po přidání záznamů na Resendu klikni **"Verify DNS Records"** — ověření
   může chvíli trvat (od pár minut po pár hodin, DNS propagace).

Dokud doména není ověřená, kód v `sendInquiryConfirmationEmail` selže potichu
(zaloguje chybu, poptávka v Sheets zůstává v pořádku uložená) — to je
očekávané chování, ne bug.

## Odesílací adresa

Nastavena natvrdo v `src/lib/resend.ts` jako `LU by Lucie <poptavky@lubyluci.cz>`.
Jde změnit, ale musí to být adresa na ověřené doméně.
