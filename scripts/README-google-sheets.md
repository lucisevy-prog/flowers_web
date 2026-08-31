# Poptávkový formulář → Google Sheets

Web zapisuje nové poptávky přímo do Google Sheets přes **servisní účet**
(Service Account) — zvláštní "robotí" Google účet, který si vytvoříme sami a
který nemá žádné z těch křehkých nastavení přístupu, na kterých se lámal
předchozí pokus přes Apps Script. Kód je v
[`src/lib/google-sheets.ts`](../src/lib/google-sheets.ts), volá ho
[`src/lib/contact.functions.ts`](../src/lib/contact.functions.ts).

## Jednorázové nastavení (dělá se v Google Cloud Console)

1. Jdi na **console.cloud.google.com** a přihlas se (klidně stejným účtem,
   pod kterým je i ten Sheet — `lubyluci.studio@gmail.com`).
2. Nahoře vytvoř **nový projekt** (např. "LU by Lucie") — je to zdarma,
   žádná platební karta se nevyžaduje pro to, co potřebujeme.
3. V levém menu **APIs & Services → Library**, vyhledej **"Google Sheets
   API"** a klikni **Enable**.
4. **APIs & Services → Credentials → Create Credentials → Service Account**.
   - Jméno klidně "lu-web-poptavky", zbytek nech výchozí, "Create and
     Continue" → "Done" (role ani přístup nastavovat nemusíš).
5. V seznamu servisních účtů klikni na ten nový → záložka **Keys** → **Add
   Key → Create new key → JSON**. Stáhne se soubor s klíčem — **ulož si ho,
   nikam ho nesdílej veřejně**.
6. Otevři ten stažený JSON soubor, najdeš v něm:
   - `client_email` — něco jako `lu-web-poptavky@tvuj-projekt.iam.gserviceaccount.com`
   - `private_key` — dlouhý blok textu začínající `-----BEGIN PRIVATE KEY-----`

## Sdílet Sheet se servisním účtem

7. Otevři Google Sheet s poptávkami, klikni **Sdílet**, vlož tam ten
   `client_email` z kroku 6 a dej mu roli **Editor**. Tohle je jediné
   "povolení", které servisní účet potřebuje — žádné deploy dropdowny.

## Proměnné prostředí na Vercelu

Project Settings → Environment Variables, přidat tři:

| Název                                | Hodnota                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`       | `client_email` z JSON souboru                                                     |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | `private_key` z JSON souboru (i s `-----BEGIN/END PRIVATE KEY-----` řádky)        |
| `GOOGLE_SHEET_ID`                    | ID tabulky z její URL — `docs.google.com/spreadsheets/d/`**`TOHLE_ID`**`/edit...` |

Po uložení proměnných je potřeba udělat nový deploy (Vercel to nabídne samo).

## Notifikace o nové poptávce

Tohle už nezajišťuje kód (dřív to dělal Apps Script), ale vestavěná funkce
přímo v Sheets — Lucie si ji nastaví sama, jednou:

**Nástroje → Oznámení o pravidlech → "Jakékoliv změny" → "E-mailem ihned"**

## Sloupce, které se zapisují

Web zapisuje podle **názvu hlavičky** v prvním řádku tabulky (ne podle
pořadí), takže si mezi ně Lucie může kdykoliv přidat vlastní interní sloupce
a nic se nerozbije:

`Datum poptávky`, `Jméno`, `Email`, `Telefon`, `Datum akce`, `Zážitek`,
`Typ akce`, `Počet osob`, `Lokalita`, `Zpráva klienta`

Sloupce `Stav`, `Dny do akce`, `Místo konání`, `Cena`, `Záloha`, `Doplatek`,
`Poznámka` jsou čistě interní a web do nich nikdy nezapisuje.
