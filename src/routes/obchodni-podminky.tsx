import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/obchodni-podminky")({
  head: () => ({
    meta: [
      { title: "Všeobecné obchodní podmínky — LU by Lucie" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ObchodniPodminky,
});

const sections: LegalSection[] = [
  {
    heading: "1. Poskytovatel",
    blocks: [
      [
        "Jméno a příjmení / obchodní firma: Lucie Ševčíková",
        "IČO: 05652391",
        "Sídlo: Kladenská 454/50, 160 00 Praha 6",
        "E-mail: lubyluci.studio@gmail.com",
        "Telefon: 777 992 589",
        "Web: www.lubyluci.cz",
        "Bankovní spojení: 2101227000/2010",
      ],
      "dále jen „Poskytovatel“.",
      "Tyto všeobecné obchodní podmínky upravují vztahy mezi Poskytovatelem a fyzickou nebo právnickou osobou objednávající služby Poskytovatele, dále jen „Klient“.",
    ],
  },
  {
    heading: "2. Nabízené služby",
    blocks: [
      "Poskytovatel nabízí zejména interaktivní květinové zážitky, květinové bary, tematické flower experiences, pronájem Flower Bar Kitu a další související služby pro soukromé, svatební, firemní a jiné společenské akce.",
      "Konkrétní rozsah služby, termín, místo konání, počet účastníků, cena a případné individuální požadavky jsou sjednány v rámci objednávky nebo individuální cenové nabídky.",
      "Fotografie, vizualizace a ukázky na webových stránkách, sociálních sítích a v propagačních materiálech mají především ilustrační charakter, není-li výslovně uvedeno jinak.",
    ],
  },
  {
    heading: "3. Jak funguje rezervace",
    blocks: [
      "Odeslání poptávky: Vyplněním a odesláním poptávkového formuláře Klient ověřuje dostupnost požadovaného termínu. Samotné odeslání formuláře ještě nepředstavuje závaznou rezervaci termínu.",
      "Potvrzení termínu: Poskytovatel zpravidla do 24 hodin od obdržení poptávky potvrdí dostupnost požadovaného termínu a zašle Klientovi informace potřebné k dokončení rezervace a platbě. Lhůta 24 hodin je orientační.",
      "Závazná rezervace: Termín je závazně rezervován až po potvrzení objednávky a připsání požadované zálohy, případně celé ceny služby, na účet Poskytovatele. Do tohoto okamžiku není Poskytovatel povinen termín pro Klienta blokovat.",
    ],
  },
  {
    heading: "4. Cena a platební podmínky",
    blocks: [
      "Cena služby vychází z aktuálního ceníku Poskytovatele nebo z individuálně vytvořené nabídky.",
      "Pro závaznou rezervaci termínu se hradí záloha ve výši 50 % z celkové ceny objednávky.",
      "U objednávek vytvořených méně než 14 dní před konáním akce může Poskytovatel požadovat úhradu 100 % ceny předem.",
      "Doplatek ceny je splatný nejpozději 7 dní před konáním akce, není-li individuálně dohodnuto jinak.",
      "Případná doprava, nadstandardní požadavky, dodatečné množství květin, rozšíření služby nebo jiné individuální požadavky mohou být účtovány samostatně, pokud nejsou zahrnuty v potvrzené ceně.",
    ],
  },
  {
    heading: "5. Počet účastníků",
    blocks: [
      "Rozsah služby a její cena vycházejí z počtu účastníků uvedeného Klientem při objednávce, případně z individuálně sjednaného rozsahu akce.",
      "Pokud se počet účastníků po potvrzení objednávky změní, Klient o této změně informuje Poskytovatele co nejdříve. Případná změna rozsahu služby nebo ceny bude následně domluvena individuálně.",
      "Pokud již byly na základě původně sjednaného počtu účastníků objednány květiny nebo připraven materiál, nemusí pozdější snížení počtu účastníků znamenat snížení sjednané ceny.",
    ],
  },
  {
    heading: "6. Storno podmínky",
    blocks: [
      "Vzhledem k tomu, že Poskytovatel pro jednotlivé akce rezervuje konkrétní termín, připravuje služby individuálně a zajišťuje čerstvé květiny, materiál a další vybavení, platí při zrušení rezervace ze strany Klienta následující podmínky:",
      [
        "Více než 14 dní před akcí: Klientovi bude vráceno 100 % zaplacené zálohy.",
        "14 až 7 dní před akcí: Klientovi bude vráceno 50 % zaplacené zálohy.",
        "Méně než 7 dní před akcí: Zaplacená záloha je nevratná.",
      ],
      "Storno podmínky zohledňují zejména blokaci termínu, přípravné práce, rezervované kapacity a náklady spojené se zajištěním květin, materiálu a vybavení pro konkrétní akci.",
      "Pokud již Klient uhradil celou cenu služby, vypořádání zaplacené částky bude provedeno s ohledem na výše uvedený storno režim a již vzniklé náklady.",
      "Storno musí Klient oznámit e-mailem na adresu lubyluci.studio@gmail.com. Za rozhodující se považuje okamžik doručení storna Poskytovateli.",
    ],
  },
  {
    heading: "7. Změna termínu",
    blocks: [
      "Klient může požádat o změnu sjednaného termínu.",
      "Změna termínu je možná zdarma nejpozději 7 dní před původním termínem akce, pokud má Poskytovatel požadovaný nový termín k dispozici. Nový termín je platný až po jeho potvrzení Poskytovatelem.",
      "Pokud Klient požádá o změnu méně než 7 dní před akcí, bude situace řešena individuálně s ohledem na již objednané květiny, materiál a další vzniklé náklady.",
      "Poskytovatel není povinen změně termínu vyhovět v případě, že nový požadovaný termín nemá k dispozici.",
    ],
  },
  {
    heading: "8. Květiny a jejich dostupnost",
    blocks: [
      "Klient bere na vědomí, že květiny jsou přírodní a sezónní materiál. Konkrétní druhy, odrůdy, velikosti, odstíny a dostupnost květin se mohou měnit podle sezóny, nabídky dodavatelů a aktuální kvality dostupných květin.",
      "Pokud nebude konkrétní sjednaný druh dostupný nebo nebude odpovídat požadované kvalitě, může Poskytovatel po dohodě s Klientem použít vhodnou alternativu obdobného charakteru, barevnosti, hodnoty nebo celkového vizuálního stylu.",
      "Drobné rozdíly oproti fotografiím, vizualizacím nebo předchozím realizacím nejsou považovány za vadu služby.",
    ],
  },
  {
    heading: "9. Čerstvé květiny po předání",
    blocks: [
      "Čerstvé květiny mají přirozeně omezenou životnost. Jejich stav ovlivňuje zejména teplota, přímé slunce, vítr, přístup k vodě, způsob přepravy a následná manipulace.",
      "Po řádném předání květin nebo ukončení služby Poskytovatel neodpovídá za zhoršení jejich stavu způsobené nevhodným skladováním, manipulací nebo podmínkami na místě.",
    ],
  },
  {
    heading: "10. Místo konání",
    blocks: [
      "Klient odpovídá za zajištění vhodného prostoru pro realizaci objednané služby.",
      "Klient Poskytovatele předem informuje zejména o případných omezeních přístupu autem, parkování, schodech, omezeném čase pro instalaci, velké vzdálenosti mezi místem vykládky a místem konání nebo jiných okolnostech, které mohou významně ovlivnit realizaci služby.",
      "Pokud služba vyžaduje specifické podmínky, například přístup k vodě, elektrické energii nebo určitou velikost prostoru, sdělí je Poskytovatel Klientovi předem.",
    ],
  },
  {
    heading: "11. Venkovní akce a počasí",
    blocks: [
      "U venkovních akcí odpovídá Klient za zajištění vhodné kryté, tzv. mokré varianty pro případ nepříznivého počasí.",
      "Poskytovatel není povinen instalovat vybavení nebo realizovat službu v podmínkách, které by mohly ohrozit bezpečnost osob, způsobit poškození květin či vybavení nebo objektivně znemožnit řádné poskytnutí služby.",
      "Zrušení akce ze strany Klienta z důvodu nepříznivého počasí méně než 7 dní před sjednaným termínem podléhá standardním storno podmínkám.",
      "Pokud mimořádné či nebezpečné povětrnostní podmínky objektivně znemožní bezpečnou realizaci služby, budou se Klient a Poskytovatel snažit nalézt vhodné náhradní řešení.",
    ],
  },
  {
    heading: "12. Flower Bar Kit",
    blocks: [
      "Flower Bar Kit je standardně zapůjčen na dobu 24 hodin, není-li individuálně dohodnuto jinak. Cena pronájmu vychází z aktuálního ceníku Poskytovatele.",
      "Při převzetí Flower Bar Kitu se hradí vratná kauce ve výši 2 000 Kč.",
      "Obsah Flower Bar Kitu a jeho stav si Poskytovatel a Klient společně potvrdí při předání.",
      "Při vrácení bude vybavení zkontrolováno. Pokud bude vráceno kompletní a bez poškození nad rámec běžného opotřebení, bude kauce Klientovi ihned vrácena.",
      "V případě ztráty nebo poškození vybavení hradí Klient skutečně vzniklou škodu. Kauce nepředstavuje maximální výši odpovědnosti Klienta za vzniklou škodu.",
      "Flower Bar Kit musí být vrácen ve sjednaném čase. Případné prodloužení doby pronájmu je možné po předchozí dohodě s Poskytovatelem.",
      "Spotřební materiál, který je podle konkrétní objednávky určen k použití během akce, se při vrácení samozřejmě nevrací.",
    ],
  },
  {
    heading: "13. Používání zapůjčeného vybavení",
    blocks: [
      "Klient je povinen zapůjčené vybavení používat šetrně a v souladu s jeho běžným účelem.",
      "Klient odpovídá za zapůjčené vybavení od okamžiku převzetí do okamžiku jeho řádného vrácení.",
      "Za běžné opotřebení vzniklé řádným používáním vybavení se náhrada neúčtuje.",
    ],
  },
  {
    heading: "14. Průběh květinového zážitku",
    blocks: [
      "Jednotlivé květinové zážitky mohou obsahovat interaktivní prvky, hry, kartičky, návody, práci s květinami, stuhami, nůžkami a dalšími floristickými pomůckami.",
      "Pokud služba probíhá bez přítomnosti Poskytovatele, vede Klient nebo jiná jím určená osoba zážitek samostatně podle dodaných instrukcí.",
      "U nezletilých účastníků odpovídá Klient za zajištění odpovídajícího dohledu dospělé osoby.",
    ],
  },
  {
    heading: "15. Fotografie a videa",
    blocks: [
      "Fotografie a videa pořízené během realizace mohou být použity pro marketingové účely Poskytovatele pouze za předpokladu, že je k tomu k dispozici odpovídající souhlas nebo jiný právní titul.",
      "Pokud bude Poskytovatel chtít použít fotografie nebo video, na kterých jsou identifikovatelní Klient nebo jeho hosté, bude toto oprávnění řešeno samostatně podle konkrétní situace.",
    ],
  },
  {
    heading: "16. Zrušení služby ze strany Poskytovatele",
    blocks: [
      "Pokud nebude Poskytovatel schopen službu realizovat z důvodu nemoci, mimořádné události nebo jiné závažné překážky na své straně, informuje Klienta bez zbytečného odkladu.",
      "Klient a Poskytovatel se mohou dohodnout na náhradním termínu.",
      "Pokud náhradní termín nebude možný nebo přijatelný, vrátí Poskytovatel Klientovi částku uhrazenou za neposkytnutou službu.",
    ],
  },
  {
    heading: "17. Mimořádné okolnosti",
    blocks: [
      "Poskytovatel neodpovídá za nemožnost nebo zpoždění plnění způsobené mimořádnými okolnostmi, které nemohl rozumně ovlivnit.",
      "Může se jednat například o mimořádné přírodní události, zásadní dopravní omezení, výpadky infrastruktury, rozhodnutí orgánů veřejné moci nebo jiné obdobné nepředvídatelné události.",
      "V takové situaci se budou strany přednostně snažit dohodnout na rozumném náhradním řešení.",
    ],
  },
  {
    heading: "18. Reklamace",
    blocks: [
      "Pokud má Klient za to, že služba nebyla poskytnuta v souladu se sjednanými podmínkami, oznámí tuto skutečnost Poskytovateli bez zbytečného odkladu.",
      "Reklamace lze zasílat na lubyluci.studio@gmail.com. Reklamace bude vyřízena v souladu s příslušnými právními předpisy. Tím nejsou dotčena zákonná práva spotřebitele.",
    ],
  },
  {
    heading: "19. Spotřebitelská práva",
    blocks: [
      "Je-li Klient spotřebitelem, náleží mu práva stanovená občanským zákoníkem a dalšími právními předpisy na ochranu spotřebitele.",
      "V případě smluv uzavíraných prostřednictvím internetu nebo jiným distančním způsobem se právo spotřebitele na odstoupení od smlouvy řídí příslušnými právními předpisy.",
      "U služeb poskytovaných v konkrétním termínu mohou platit zákonné výjimky z obecného práva na odstoupení od smlouvy.",
    ],
  },
  {
    heading: "20. Mimosoudní řešení spotřebitelských sporů",
    blocks: [
      "Je-li Klient spotřebitelem, má v případě spotřebitelského sporu právo obrátit se na příslušný subjekt mimosoudního řešení spotřebitelských sporů.",
      "Příslušným subjektem je zejména Česká obchodní inspekce. Informace o mimosoudním řešení spotřebitelských sporů jsou dostupné na webových stránkách České obchodní inspekce.",
    ],
  },
  {
    heading: "21. Ochrana osobních údajů",
    blocks: [
      "Osobní údaje Klientů jsou zpracovávány v souladu s platnými právními předpisy. Podrobnější informace jsou uvedeny v samostatném dokumentu Zásady ochrany osobních údajů, dostupném na webových stránkách Poskytovatele.",
    ],
  },
  {
    heading: "22. Závěrečná ustanovení",
    blocks: [
      "Tyto obchodní podmínky tvoří součást smlouvy uzavírané mezi Poskytovatelem a Klientem.",
      "Individuálně sjednané podmínky potvrzené Poskytovatelem mají přednost před obecnými ustanoveními těchto VOP.",
      "Právní vztahy neupravené těmito VOP se řídí právním řádem České republiky, zejména příslušnými ustanoveními občanského zákoníku.",
    ],
  },
];

function ObchodniPodminky() {
  return (
    <LegalPage
      title="Všeobecné obchodní podmínky"
      effectiveDate="20. 8. 2026"
      intro="pro poskytování květinových zážitků, květinových barů a pronájem souvisejícího vybavení"
      sections={sections}
    />
  );
}
