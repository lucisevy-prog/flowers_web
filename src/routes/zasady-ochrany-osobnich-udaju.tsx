import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/zasady-ochrany-osobnich-udaju")({
  head: () => ({
    meta: [
      { title: "Zásady ochrany osobních údajů — LU by Lucie" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.lubyluci.cz/zasady-ochrany-osobnich-udaju" }],
  }),
  component: ZasadyOchranyOsobnichUdaju,
});

const sections: LegalSection[] = [
  {
    heading: "1. Kdo vaše osobní údaje zpracovává",
    blocks: [
      "Správcem osobních údajů je:",
      [
        "Jméno a příjmení / obchodní firma: Lucie Ševčíková",
        "IČO: 05652391",
        "Sídlo: Kladenská 454/50, 160 00 Praha 6",
        "E-mail: lubyluci.studio@gmail.com",
        "Telefon: 777 992 589",
        "Web: www.lubyluci.cz",
      ],
      "dále jen „Správce“.",
      "V případě jakýchkoliv dotazů týkajících se zpracování osobních údajů se můžete obrátit na Správce prostřednictvím výše uvedeného e-mailu.",
    ],
  },
  {
    heading: "2. Jaké osobní údaje zpracováváme",
    blocks: [
      "Zpracováváme pouze osobní údaje, které jsou potřebné pro komunikaci s vámi, zpracování poptávky, rezervaci a poskytnutí objednaných služeb nebo splnění našich zákonných povinností. Může se jednat zejména o:",
      [
        "jméno a příjmení",
        "e-mailovou adresu",
        "telefonní číslo",
        "fakturační údaje",
        "údaje uvedené v poptávkovém formuláři",
        "datum, místo a typ plánované akce",
        "počet účastníků",
        "informace, které nám sami sdělíte v rámci poptávky nebo následné komunikace",
        "údaje související s objednávkou, platbou a realizací služby",
        "údaje potřebné při případné reklamaci nebo jiném řešení smluvního vztahu",
      ],
      "Úřad pro ochranu osobních údajů mezi běžné kategorie osobních údajů řadí například identifikační a kontaktní údaje, jako jsou jméno, adresa, e-mail nebo telefon.",
    ],
  },
  {
    heading: "3. Poptávkový formulář",
    blocks: [
      "Pokud odešlete prostřednictvím webových stránek poptávkový formulář, zpracováváme údaje, které v něm uvedete. Tyto údaje používáme za účelem:",
      [
        "zpracování vaší poptávky",
        "ověření dostupnosti požadovaného termínu",
        "přípravy nabídky",
        "komunikace o požadované službě",
        "případného následného uzavření smlouvy",
      ],
      "Právním základem je zejména provedení kroků na vaši žádost před uzavřením smlouvy a následně plnění smlouvy, pokud si službu objednáte.",
    ],
  },
  {
    heading: "4. Rezervace a realizace služby",
    blocks: [
      "Pokud si objednáte některou z našich služeb, zpracováváme osobní údaje nezbytné k vyřízení objednávky a realizaci služby. Jedná se zejména o údaje potřebné pro:",
      [
        "rezervaci termínu",
        "komunikaci před akcí",
        "přípravu objednaného květinového zážitku",
        "realizaci služby",
        "předání a vrácení Flower Bar Kitu, pokud je součástí objednávky",
        "platbu a evidenci objednávky",
        "případné řešení reklamace",
      ],
      "Právním základem tohoto zpracování je plnění smlouvy.",
    ],
  },
  {
    heading: "5. E-mailová a telefonická komunikace",
    blocks: [
      "Pokud nás kontaktujete prostřednictvím e-mailu nebo telefonu, zpracováváme vámi poskytnuté kontaktní údaje a obsah komunikace v rozsahu nezbytném pro vyřízení vašeho dotazu, poptávky nebo objednávky.",
      "Pokud komunikace směřuje k objednávce služby, je právním základem zejména jednání před uzavřením smlouvy nebo následné plnění smlouvy.",
    ],
  },
  {
    heading: "6. Komunikace prostřednictvím WhatsApp",
    blocks: [
      "Na webových stránkách může být k dispozici možnost kontaktovat nás prostřednictvím služby WhatsApp.",
      "Pokud tuto možnost využijete, mohou být vaše osobní údaje, zejména telefonní číslo, jméno/profilové údaje a obsah komunikace, zpracovávány také provozovatelem služby WhatsApp podle jeho vlastních podmínek ochrany osobních údajů.",
      "Použití WhatsApp je dobrovolné. Pro komunikaci s námi můžete využít také e-mail nebo telefon.",
    ],
  },
  {
    heading: "7. Fakturace a zákonné povinnosti",
    blocks: [
      "Údaje potřebné k vystavení účetních a daňových dokladů zpracováváme za účelem splnění zákonných povinností. Tyto údaje uchováváme po dobu stanovenou příslušnými právními předpisy.",
      "Právním základem tohoto zpracování je plnění právní povinnosti Správce.",
    ],
  },
  {
    heading: "8. Ochrana práv a oprávněné zájmy",
    blocks: [
      "V nezbytném rozsahu můžeme některé údaje uchovávat také za účelem ochrany našich práv, řešení případných sporů, reklamací nebo právních nároků.",
      "Právním základem může být oprávněný zájem Správce na ochraně a uplatňování jeho právních nároků.",
    ],
  },
  {
    heading: "9. Jak dlouho údaje uchováváme",
    blocks: [
      "Osobní údaje uchováváme pouze po dobu nezbytnou vzhledem k účelu, pro který byly získány.",
      "Údaje související s poptávkou, ze které nevznikne objednávka, uchováváme pouze po přiměřenou dobu potřebnou k vyřízení komunikace a případnému navázání na původní poptávku.",
      "Údaje související s uskutečněnou objednávkou můžeme uchovávat po dobu potřebnou pro plnění smlouvy a následně po dobu nezbytnou k ochraně našich práv a plnění zákonných povinností.",
      "Účetní a daňové dokumenty uchováváme po dobu vyžadovanou příslušnými právními předpisy.",
    ],
  },
  {
    heading: "10. Komu mohou být údaje zpřístupněny",
    blocks: [
      "Vaše osobní údaje neprodáváme. V nezbytném rozsahu k nim mohou mít přístup poskytovatelé služeb, které používáme pro provoz našeho podnikání, například:",
      [
        "poskytovatel webových stránek a hostingu",
        "poskytovatel e-mailových služeb",
        "poskytovatel formulářového řešení",
        "účetní nebo poskytovatel účetního/fakturačního systému",
        "poskytovatelé IT služeb",
        "poskytovatelé komunikačních služeb, pokud je sami využijete",
      ],
      "Takové subjekty mohou v konkrétním případě vystupovat jako samostatní správci nebo jako naši zpracovatelé. Typickými zpracovateli mohou být například provozovatelé informačních systémů nebo cloudových úložišť.",
      "Osobní údaje mohou být dále zpřístupněny orgánům veřejné moci, pokud nám takovou povinnost stanoví právní předpis.",
    ],
  },
  {
    heading: "11. Fotografie a videa z akcí",
    blocks: [
      "Pořízení fotografie nebo videa na akci samo o sobě automaticky neznamená, že je můžeme použít pro marketingové účely.",
      "Pokud budeme chtít použít fotografie nebo videa, na kterých jste identifikovatelní vy nebo vaši hosté, například na našem webu, sociálních sítích nebo v propagačních materiálech, budeme postupovat podle příslušných právních předpisů a podle konkrétní situace si zajistíme odpovídající oprávnění.",
    ],
  },
  {
    heading: "12. Newsletter a obchodní sdělení",
    blocks: [
      "V současné době prostřednictvím webových stránek nenabízíme přihlášení k newsletteru.",
      "Kontaktní údaje získané prostřednictvím poptávkového formuláře nebudeme automaticky používat k rozesílání pravidelných newsletterů pouze proto, že jste nám zaslali poptávku.",
      "Pokud v budoucnu newsletter zavedeme, budou pravidla jeho odběru a související informace upraveny samostatně.",
    ],
  },
  {
    heading: "13. Cookies",
    blocks: [
      "Webové stránky mohou používat technické cookies nezbytné pro jejich správné fungování.",
      "Pokud budou v budoucnu používány také analytické, marketingové nebo jiné netechnické cookies vyžadující souhlas, budou návštěvníkům webu poskytnuty odpovídající informace a možnost jejich použití přijmout nebo odmítnout.",
      "Podle ÚOOÚ technické cookies nezbytné pro fungování webu souhlas nevyžadují. U netechnických cookies je naopak potřeba řešit předchozí souhlas a odmítnutí musí být stejně jednoduché jako jeho udělení.",
    ],
  },
  {
    heading: "14. Vaše práva",
    blocks: [
      "V souvislosti se zpracováním osobních údajů máte za podmínek stanovených GDPR zejména právo:",
      [
        "požadovat informace o zpracování svých osobních údajů",
        "získat přístup ke svým osobním údajům",
        "požadovat opravu nepřesných nebo neúplných údajů",
        "požadovat výmaz osobních údajů, pokud jsou splněny zákonné podmínky",
        "požadovat omezení zpracování",
        "v příslušných případech získat své údaje v přenositelném formátu",
        "vznést námitku proti zpracování založenému na oprávněném zájmu",
        "odvolat souhlas, pokud je konkrétní zpracování založeno na souhlasu",
      ],
      "GDPR rovněž dává subjektu údajů právo požádat správce o informace o tom, jaké jeho údaje zpracovává; správce má na vyřízení takové žádosti standardně nejvýše jeden měsíc.",
    ],
  },
  {
    heading: "15. Stížnost u Úřadu pro ochranu osobních údajů",
    blocks: [
      "Pokud se domníváte, že při zpracování vašich osobních údajů dochází k porušování právních předpisů, máte právo podat stížnost u:",
      ["Úřad pro ochranu osobních údajů", "Pplk. Sochora 27", "170 00 Praha 7"],
    ],
  },
  {
    heading: "16. Zabezpečení osobních údajů",
    blocks: [
      "Přijímáme přiměřená technická a organizační opatření, jejichž cílem je chránit osobní údaje před neoprávněným přístupem, ztrátou, zneužitím nebo neoprávněným zveřejněním.",
      "Přístup k osobním údajům mají pouze osoby a poskytovatelé služeb, kteří jej potřebují k plnění příslušných úkolů.",
    ],
  },
  {
    heading: "17. Změny těchto zásad",
    blocks: [
      "Tyto zásady můžeme aktualizovat zejména v případě změny právních předpisů, nabízených služeb nebo technického fungování webových stránek.",
      "Aktuální verze bude vždy dostupná na webových stránkách.",
    ],
  },
];

function ZasadyOchranyOsobnichUdaju() {
  return (
    <LegalPage
      title="Zásady ochrany osobních údajů"
      effectiveDate="20. 8. 2026"
      intro="Tyto zásady vysvětlují, jakým způsobem jsou zpracovávány osobní údaje návštěvníků webových stránek, zájemců o služby a klientů."
      sections={sections}
    />
  );
}
