import heroFlowerBar from "@/assets/hero-flower-bar.jpg";
import diyKit from "@/assets/diy-kit.jpg";
import babyShower from "@/assets/gender-reveal.jpg";
import flowerFortune from "@/assets/flower-fortune.jpg";
import hvezdnyFlowerBar from "@/assets/mini-experience.jpg";

export type Tier = {
  name: string;
  tagline: string;
  price: string;
  guests: string;
  highlights: string[];
  featured?: boolean;
};

export type Experience = {
  slug: string;
  title: string;
  eyebrow: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  duration: string;
  guests: string;
  from: string;
  audience: string[];
  steps: { title: string; description: string }[];
  included: string[];
  idealFor: string[];
  tiers?: Tier[];
  priceBlocks?: { label: string; value: string; note?: string }[];
  extraGuest?: { label: string; price: string };
  deliveryZones?: { icon: string; label: string; price: string; note?: string }[];
};

const defaultDelivery = [
  {
    icon: "📍",
    label: "Osobní odběr (Tuchoměřice / Praha 6)",
    price: "Zdarma",
    note: "vyzvednutí i vrácení",
  },
  {
    icon: "🚗",
    label: "Západní okruh (Praha, Praha-západ, Kladno, Slaný, Beroun)",
    price: "1 000 Kč",
    note: "full servis dovoz i odvoz",
  },
  {
    icon: "🗺️",
    label: "Východní okruh (Praha-východ a dál)",
    price: "1 800 Kč",
    note: "full servis dovoz i odvoz",
  },
];

const deliveryWithSetup = [
  {
    icon: "🚗",
    label: "Západní okruh (Praha, Praha-západ, Kladno, Slaný, Beroun)",
    price: "1 000 Kč",
    note: "full servis dovoz i odvoz, příprava, úklid",
  },
  {
    icon: "🗺️",
    label: "Východní okruh (Praha-východ a dál)",
    price: "1 800 Kč",
    note: "full servis dovoz i odvoz, příprava, úklid",
  },
];

export const experiences: Experience[] = [
  {
    slug: "premium-flower-bar",
    title: "Premium Flower Bar",
    eyebrow: "Vlajkový zážitek",
    shortDescription:
      "Prémiový květinový bar s kompletním servisem — interaktivní, estetický a voňavý koutek, kde se hosté z pasivních diváků stávají tvůrci.",
    longDescription:
      "PREMIUM Flower Bar od LU je interaktivní, estetický a voňavý koutek, kde se vaši hosté z pasivních diváků stávají tvůrci. Na vaši akci přivezeme kompletně vybavený, minimalistický bar plný těch nejkrásnějších prémiových květin. Vaši hosté si sami vytvoří svou vlastní kombinaci květin, kterou si umístí do speciální květinové taštičky a dozdobí stužkou dle svého výběru.",
    image: heroFlowerBar,
    duration: "2–3 hodiny",
    guests: "do 70 hostů",
    from: "od 15 000 Kč",
    audience: ["Svatby", "Firemní eventy & brand aktivace", "Tiskové konference & VIP večírky"],
    steps: [
      {
        title: "Návrh na míru",
        description:
          "Společně si ujasníme styl, barevnou paletu a atmosféru vaší akce. Květiny i design baru přizpůsobíme tak, aby dokonale ladily s konceptem vašeho eventu.",
      },
      {
        title: "Instalace bez starostí",
        description:
          "V den akce přijedeme na místo s předstihem. Postavíme stylový bar, naaranžujeme čerstvé prémiové květiny a připravíme veškeré náčiní. Vy se o nic nestaráte.",
      },
      {
        title: "Zážitek na akci",
        description:
          "Bar se otevírá v předem domluvený čas. Hosté chodí, vybírají si stonky, kombinují barvy a vůně. Jsme jim po celou dobu k dispozici. Jde o zážitek, ne o složitý workshop, který by narušoval vaši akci.",
      },
      {
        title: "Dárek, který si odnáší domů",
        description: "Hosté si tak z vaší akce odnášejí ten nejkrásnější personalizovaný dárek.",
      },
    ],
    included: [
      "Prémiová květinová selekce — jen ty nejkrásnější, nejčerstvější a nejzajímavější sezónní květiny (pivoňky, eukalypt, prémiové růže atd.)",
      "Kompletní inventář LU: stylový mobilní bar, floristické nůžky, stužky, květinové tašky",
      "Naše osobní přítomnost po celou dobu trvání baru (standardně 2 hodiny)",
      "Logistika a úklid: doprava na místo, instalace, deinstalace a kompletní úklid prostoru po akci",
    ],
    idealFor: [
      "Svatby — perfektní oživení odpoledního programu a nádherný dárek pro svatebčany",
      "Firemní eventy & brand aktivace — originální způsob, jak zaujmout klientky, partnerky nebo zaměstnance",
      "Tiskové konference & VIP večírky — vysoce fotogenický prvek pro sociální sítě vašich hostů",
    ],
    tiers: [
      {
        name: "Petite",
        tagline: "Komorní oslavy",
        price: "15 000 Kč",
        guests: "do 20 hostů",
        highlights: [
          "2 hodiny naší asistence na místě",
          "Kompletní inventář",
          "Dárkové balení pro každého hosta",
        ],
      },
      {
        name: "Signature",
        tagline: "Nejoblíbenější",
        price: "19 000 Kč",
        guests: "do 40 hostů",
        featured: true,
        highlights: [
          "2 hodiny naší asistence na místě",
          "Rozšířený inventář a design baru",
          "Dárkové balení pro každého hosta",
        ],
      },
      {
        name: "Grand",
        tagline: "Velkolepé eventy",
        price: "27 000 Kč",
        guests: "do 70 hostů",
        highlights: [
          "3 hodiny naší asistence na místě",
          "Exkluzivní selekce květin",
          "Prioritní plánování konceptu na míru",
          "Dárkové balení pro každého hosta",
        ],
      },
    ],
  },
  {
    slug: "diy-flower-bar-kit",
    title: "DIY Flower Bar Kit",
    eyebrow: "Zážitek na doma",
    shortDescription:
      "Váš vlastní květinový bar, jednoduše a bez starostí — kompletní designový set, který si zapůjčíte na 24 hodin.",
    longDescription:
      "DIY Flower Bar Kit je kompletní designový set, který vám zapůjčíme na 24 hodin. Získáte všechno profesionální vybavení, stylové doplňky a přesný návod, jak bar na místě sestavit. Vy si jen zajistíte své oblíbené květiny a můžete začít tvořit. Květiny ani obsluha nejsou součástí kitu — máte tak plnou kontrolu nad rozpočtem a stylem: nakoupíte přesně tolik květin, kolik potřebujete, přesně v druzích a barvách, které milujete.",
    image: diyKit,
    duration: "zápůjčka na 24 hodin",
    guests: "libovolný počet (dle počtu kitů)",
    from: "3 900 Kč / 24 hodin",
    audience: ["Rozlučky se svobodou", "Narozeniny", "Zahradní párty"],
    steps: [
      {
        title: "Rezervace termínu",
        description: "Vyberete si datum své akce a zarezervujete si kit včas.",
      },
      {
        title: "Vyzvednutí a příprava",
        description:
          "Kit si u nás vyzvednete (nebo vám ho po dohodě doručíme). Podle našeho návodu bar snadno sestavíte za 15 minut.",
      },
      {
        title: "Vaše párty, vaše pravidla",
        description: "Užijete si vaši událost s květinovým barem podle svého.",
      },
      {
        title: "Vrácení inventáře",
        description: "Druhý den nám set jednoduše vrátíte zpět.",
      },
    ],
    included: [
      "Kompletní inventář LU: květinový stojan s nádobami na květiny, boho slunečník, barový stolek, profesionální floristické nůžky a doplňky",
      "Materiál na balení: stuhy a dárkové tašky, aby si hosté odnesli své kytice bezpečně a elegantně domů",
      "„How-to“ manuál — přehledný návod krok za krokem, jak bar sestavit. Zvládne to úplně každý.",
    ],
    idealFor: [
      "Rozlučky se svobodou, které si chcete „odmoderovat“ samy",
      "Narozeninové a zahradní párty s plnou kontrolou nad rozpočtem",
      "Kohokoliv, kdo chce styl podle sebe — vlastní druhy a barvy květin",
    ],
    priceBlocks: [
      {
        label: "Cena za 24 hodin",
        value: "3 900 Kč",
        note: "jednotná cena za pronájem",
      },
      {
        label: "Vratná kauce na inventář",
        value: "2 000 Kč",
        note: "vrací se ihned po kontrole kompletního a nepoškozeného vybavení",
      },
    ],
    deliveryZones: defaultDelivery,
  },
  {
    slug: "baby-shower-bloom",
    title: "Baby Shower Bloom Experience",
    eyebrow: "Intimní oslava",
    shortDescription:
      "Květinové tipování pohlaví, které si všichni zapamatují — interaktivní koutek plný prémiových hortenzií v růžových a modrých tónech.",
    longDescription:
      "Baby Shower Bloom Experience je interaktivní květinový koutek plný prémiových hortenzií v růžových a modrých tónech. Vy a vaši hosté nebudete jen pasivně čekat na odhalení — každý se aktivně zapojí do kreativního tipování a zároveň tím vznikne krásná vzpomínka pro budoucí rodiče.",
    image: babyShower,
    duration: "60–90 minut",
    guests: "od 10 hostů",
    from: "6 900 Kč",
    audience: ["Nastávající rodiče", "Rodinné oslavy"],
    steps: [
      {
        title: "Příprava scény",
        description:
          "Dorazíme na místo ještě před příchodem hostů. Naaranžujeme designovou stanici s čerstvými hortenziemi v barvách baby pink a baby blue, skleněnými vázičkami a doplňky.",
      },
      {
        title: "Květinové hlasování",
        description:
          "Každý host si vybere barvu hortenzie podle toho, jestli tipuje holčičku (pink), nebo chlapečka (blue), a květinu vloží do příslušné vázy.",
      },
      {
        title: "Vzkazy a tipy",
        description: "Na designové kartičky napíší hosté zlatým perem své tipy na pohlaví miminka.",
      },
      {
        title: "Odhalení a dárek domů",
        description:
          "Po odhalení pohlaví si nastávající maminka odnáší domů kytici s hortenziemi jako vzpomínku na tento den a truhličku se všemi kartičkovými tipy od svých nejbližších.",
      },
    ],
    included: [
      "Prémiové hortenzie — čerstvé, bohaté květy v růžové a modré barvě pro hlasování",
      "Kompletní designový inventář: nádoby a váza na hortenzie, stojánky, materiály, tabulky",
      "Hlasovací kartičky — stylové tiskoviny z vysokogramážního papíru a zlatá pera pro psaní vzkazů",
      "Doprava a instalace — vše nachystáme, vy se staráte jen o své hosty",
    ],
    idealFor: [
      "Páry, které nechtějí kýč",
      "Malé rodinné oslavy",
      "Fotograficky zdokumentovaný moment",
    ],
    priceBlocks: [
      { label: "Základní cena", value: "6 900 Kč", note: "kompletní balíček pro 10 hostů" },
    ],
    extraGuest: { label: "Každý další host", price: "+ 300 Kč / os." },
    deliveryZones: deliveryWithSetup,
  },
  {
    slug: "flower-fortune",
    title: "Flower Fortune",
    eyebrow: "Poetický rituál",
    shortDescription:
      "Květinový rituál pro nezapomenutelnou rozlučku se svobodou — luxusní zážitkový box plný květin, věšteckých karet a Knihy zážitku.",
    longDescription:
      "Flower Fortune je luxusní zážitkový box, který si u nás vyzvednete nebo vám předáme na domluveném místě. Najdete v něm vše od čerstvých prémiových květin až po designové Květinové kolo. Celým programem vás plynule provede naše Kniha zážitku — nemusíte se bát, že byste nevěděly, co dělat, scénář vás povede krok za krokem. Žádný stres z organizace, jen čistá radost ze společného času.",
    image: flowerFortune,
    duration: "cca 2–3 hodiny",
    guests: "nevěsta + 5 družiček",
    from: "6 900 Kč",
    audience: ["Rozlučky se svobodou", "Ženské kruhy", "Baby shower"],
    steps: [
      {
        title: "Naladění, smích a vůně",
        description:
          "Pustíte si náš exkluzivní playlist, přiťuknete si proseccem a vytáhnete si karty s citáty. Celý prostor se rozvoní čerstvými květinami.",
      },
      {
        title: "Květinové kolo a kytice plná lásky",
        description:
          "Roztáčíte květinové kolo, čtete nevěstě věštby a stonek po stonku pro ni společně skládáte kytici. Nevěsta vám na oplátku vybere květiny do vašich dárkových taštiček.",
      },
      {
        title: "Slzy dojetí a vzpomínka na celý život",
        description:
          "Napíšete nevěstě osobní dopisy, které si otevře v tichu večer před svatbou. Domů odcházíte s kyticí, dopisy a voňavými taštičkami na památku.",
      },
    ],
    included: [
      "Zapůjčíme a po akci vrátíte: designové Květinové kolo, Kniha zážitku s kompletním scénářem a QR kódem na playlist, sady karet (Alter Ego, Kytice přání, Neoficiální pravidla manželství, Květinový kód), floristické nůžky, stuhy, vázy",
      "Zůstává vám na památku: selekce prémiových čerstvých květin (cca 80 stonků)",
      "Dárkové papírové taštičky s logem LU pro každou kamarádku/družičku",
      "Dopisy nevěstě s obálkami z luxusního papíru a rozlučková kytice pro nevěstu",
    ],
    idealFor: [
      "Rozlučky se svobodou, které chtějí hloubku, styl a magickou atmosféru",
      "Ženské kruhy a baby shower",
      "Nevěsty, co chtějí poklidnější start večera místo klasické rozlučky",
    ],
    priceBlocks: [
      {
        label: "Základní cena",
        value: "6 900 Kč",
        note: "kompletní Flower Fortune Box pro nevěstu a 5 družiček",
      },
    ],
    extraGuest: { label: "Každá další družička", price: "+ 600 Kč / os." },
    deliveryZones: defaultDelivery,
  },
  {
    slug: "hvezdny-flower-bar",
    title: "Hvězdný Flower Bar",
    eyebrow: "Zážitkový večer",
    shortDescription:
      "Zážitkový večer vázání kytic podle čtyř živlů — hra s energií Ohně, Vody, Vzduchu a Země, kde kytice vypráví váš osobní příběh.",
    longDescription:
      "Hvězdný Flower Bar je intimní, kreativní a zábavný květinový zážitek. Není to floristický kurz — je to hra s energií čtyř živlů: Ohně, Vody, Vzduchu a Země. Každá z vás si v tajnosti vybere svůj živel a podle něj „uváže“ kytici, která vypráví její osobní příběh. Dokážou ostatní na konci večera uhodnout, kým opravdu jste?",
    image: hvezdnyFlowerBar,
    duration: "cca 2–3 hodiny",
    guests: "od 6 žen",
    from: "6 900 Kč",
    audience: ["Dámská jízda", "Narozeniny", "Teambuilding"],
    steps: [
      {
        title: "Vůně, hudba a první poselství",
        description:
          "Na úvod si pustíte hudbu, nalijete si sklenku něčeho dobrého a přivítáte 4 živly.",
      },
      {
        title: "Živlová výzva a tvoření",
        description:
          "V naprosté tajnosti si najdete svůj živel — Oheň, Vodu, Vzduch nebo Zemi — a podle tajného receptu vybíráte ty pravé květiny. Tvoříte srdcem, ne hlavou.",
      },
      {
        title: "Šepot květin a tipovačka",
        description:
          "Položíte kytice vedle sebe a společně hádáte, která kytice patří ke kterému živlu. Budete možná překvapené, jak přesně dokážou květiny odhalit vaše nitro.",
      },
      {
        title: "Dopis sobě",
        description:
          "Napíšete dopis sami sobě, svému budoucímu Já. Zalepíte do obálky a otevřete za 3 měsíce, abyste si připomněly energii tohoto večera.",
      },
    ],
    included: [
      "80 stonků prémiových čerstvých květin — každá z vás si domů odnese bohatou kytičku",
      "Kompletní designové tiskoviny: karta čtyř živlů, průvodce večerem, karty Šepot květin, živlové otázky, dopisy sobě s obálkami",
      "Floristické vybavení k zapůjčení: profesionální nůžky, stylové vázy a stuhy na svázání kytic",
      "Květinové tašky, svíčka, olejíčky",
    ],
    idealFor: [
      "Dámskou jízdu nebo oslavu narozenin",
      "Teambuilding s hlubším propojením",
      "Večer, na který budete vzpomínat celý rok",
    ],
    priceBlocks: [
      { label: "Základní cena", value: "6 900 Kč", note: "kompletní balíček pro 6 žen" },
    ],
    extraGuest: { label: "Každá další žena", price: "+ 600 Kč / os." },
    deliveryZones: defaultDelivery,
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
