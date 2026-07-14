import heroFlowerBar from "@/assets/hero-flower-bar.jpg";
import diyKit from "@/assets/diy-kit.jpg";
import genderReveal from "@/assets/gender-reveal.jpg";
import flowerFortune from "@/assets/flower-fortune.jpg";
import miniExperience from "@/assets/mini-experience.jpg";

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
    slug: "signature-flower-bar",
    title: "Signature Flower Bar",
    eyebrow: "Vlajkový zážitek",
    shortDescription:
      "Interaktivní květinový bar, kde si každý host uváže vlastní kytici pod odborným vedením.",
    longDescription:
      "Signature Flower Bar je vlajkový zážitek LU. Přivezeme kompletní styling — dřevěné stoly, hedvábné stuhy, keramické vázy, desítky odrůd sezónních květin ve vaší paletě. Vaši hosté si sami vážou kytici, kterou si odnesou domů jako živou vzpomínku na den.",
    image: heroFlowerBar,
    duration: "2–4 hodiny",
    guests: "6–300 hostů",
    from: "od 18 900 Kč",
    audience: ["Svatby", "Firemní eventy", "Oslavy životních milníků"],
    steps: [
      {
        title: "Konzultace & moodboard",
        description:
          "Sejdeme se osobně nebo online. Doladíme paletu, atmosféru a logistiku podle vašeho prostoru a hostů.",
      },
      {
        title: "Styling na místě",
        description:
          "Přivezeme kompletní set-up — bar, květiny, nářadí, stuhy, keramiku. Prostor připravíme 2 hodiny před startem.",
      },
      {
        title: "Zážitek pro hosty",
        description:
          "Provedu vaše hosty celým procesem — od výběru květin po finální stuhu. Součástí je fotograficky vděčné zákoutí.",
      },
      {
        title: "Kytice domů",
        description:
          "Každý host odchází s vlastní autorskou kyticí zabalenou v prémiovém papíru — vzpomínka, která ožívá doma.",
      },
    ],
    included: [
      "Kompletní květinový bar včetně stylingu",
      "8–14 odrůd prémiových sezónních květin",
      "Keramické vázy, stuhy, papír na balení",
      "Osobní vedení Lucie po celou dobu",
      "Photo-friendly zákoutí s brand detaily",
      "Doprava v rámci Prahy zdarma",
    ],
    idealFor: [
      "Svatby, které nechtějí být stereotypní",
      "Firemní eventy s důrazem na zážitek značky",
      "Významné narozeniny a jubilea",
      "Launche produktů a PR akce",
    ],
    tiers: [
      {
        name: "Petite",
        tagline: "Komorní setkání",
        price: "od 18 900 Kč",
        guests: "do 15 hostů",
        highlights: [
          "6–8 odrůd květin",
          "Kompaktní bar 1,5 m",
          "1,5 hod. styling na místě",
          "Doprava Praha",
        ],
      },
      {
        name: "Signature",
        tagline: "Nejvyhledávanější",
        price: "od 34 900 Kč",
        guests: "16–60 hostů",
        featured: true,
        highlights: [
          "10–12 odrůd + doplňky",
          "Bar 3 m + styling koutu",
          "3 hod. plný servis",
          "Doprava Praha + Střední Čechy",
          "Fotografický kout s LU signature",
        ],
      },
      {
        name: "Grand",
        tagline: "Velké eventy",
        price: "od 68 900 Kč",
        guests: "60+ hostů",
        highlights: [
          "14+ odrůd, prémiové květiny",
          "Bar 5+ m, 2 asistentky",
          "Full-day servis",
          "Doprava kdekoliv v ČR",
          "Branding & tisky na míru",
        ],
      },
    ],
  },
  {
    slug: "diy-flower-bar-kit",
    title: "DIY Flower Bar Kit",
    eyebrow: "Zážitek na doma",
    shortDescription:
      "Prémiový kit s čerstvými květinami a vším potřebným, který si odnesete nebo dostanete dovezený domů.",
    longDescription:
      "DIY Flower Bar Kit přináší LU zážitek do vaší kuchyně. Ručně sestavená krabice obsahuje čerstvé květiny, sušiny, nůžky, provázek, hedvábnou stuhu a autorské karty s návodem. Ideální dárek, aktivita na dámskou jízdu nebo klidný večer sama pro sebe.",
    image: diyKit,
    duration: "45–90 minut na doma",
    guests: "1–8 osob (více kitů)",
    from: "2 690 Kč",
    audience: ["Dárky", "Rozlučky se svobodou", "Firemní gifting"],
    steps: [
      {
        title: "Objednávka & paleta",
        description:
          "Vyberete si paletu (Blush, Sunset, Botanical, Muted) a datum dodání. Připravím kit v požadovaném počtu.",
      },
      {
        title: "Doručení",
        description:
          "Osobně předám v Praze nebo doručím kurýrem po celé ČR. Balené tak, aby květiny přijely v perfektním stavu.",
      },
      {
        title: "Váš vlastní bar",
        description:
          "Otevřete krabici, vytvoříte podle přiloženého návodu a užijete si tichý tvůrčí moment. Ideálně s vínem.",
      },
    ],
    included: [
      "6–10 stonků čerstvých květin + sušiny",
      "Hedvábná stuha, jutový provázek",
      "Prémiové nůžky (zůstávají vám)",
      "Autorská karta s návodem",
      "Balení jako dárek",
    ],
    idealFor: [
      "Rozlučky se svobodou doma",
      "Firemní dárky pro klientky",
      "Narozeninový dárek",
      "Slow-evening pro sebe",
    ],
    priceBlocks: [
      {
        label: "Cena za pronájem",
        value: "2 690 Kč",
        note: "jednotná cena za pronájem",
      },
    ],
    deliveryZones: defaultDelivery,
  },
  {
    slug: "gender-reveal-bloom",
    title: "Gender Reveal Bloom Experience",
    eyebrow: "Intimní oslava",
    shortDescription:
      "Elegantní odhalení pohlaví miminka skrze dvě zapečetěné květinové kompozice.",
    longDescription:
      "Zapomeňte na balónky a konfety. Gender Reveal Bloom Experience je editoriální oslava pro nejužší kruh — dvě zapečetěné vázy odhalí barvu ve stejný okamžik, doprovázené vůní a fotogenickým stylingem, který zůstane ve vzpomínkách i v albu.",
    image: genderReveal,
    duration: "60–90 minut",
    guests: "4–20 hostů",
    from: "8 900 Kč",
    audience: ["Nastávající rodiče", "Rodinné oslavy"],
    steps: [
      {
        title: "Diskrétní domluva",
        description:
          "S vámi nebo přes prostředníka domluvíme barvu tak, aby zůstala tajemstvím pro pár.",
      },
      {
        title: "Styling na místě",
        description:
          "Připravím stůl, dvě zapečetěné kompozice, svíčky a rámování pro fotografii.",
      },
      {
        title: "Okamžik reveal",
        description:
          "Ve zvolený moment se odhalí barva — pink, blue nebo autorská alternativa (muted mint, dusty coral).",
      },
    ],
    included: [
      "Dvě zapečetěné květinové kompozice",
      "Kompletní stolní styling",
      "Autorské kartičky Team Pink / Blue",
      "Svíčky a doplňky",
      "Osobní obsluha 90 minut",
    ],
    idealFor: [
      "Páry, které nechtějí kýč",
      "Malé rodinné oslavy",
      "Fotografy zdokumentovaný moment",
    ],
    priceBlocks: [
      { label: "Základní cena", value: "8 900 Kč", note: "platí pro 10 hostů" },
    ],
    extraGuest: { label: "Každý další host", price: "+ 390 Kč / os." },
    deliveryZones: deliveryWithSetup,
  },
  {
    slug: "flower-fortune",
    title: "Flower Fortune",
    eyebrow: "Poetický okamžik",
    shortDescription:
      "Malá kytice s ručně psaným vzkazem jako květinová věštba pro každého hosta.",
    longDescription:
      "Flower Fortune je poetický zážitek pro rozlučky, ženské kruhy a intimní setkání. Každá hostka si vylosuje jednu malou kytici s ručně psaným vzkazem — jako květinovou věštbu, kterou si odnese domů.",
    image: flowerFortune,
    duration: "45 minut",
    guests: "6–20 hostek",
    from: "4 900 Kč",
    audience: ["Rozlučky se svobodou", "Ženské kruhy", "Baby shower"],
    steps: [
      {
        title: "Autorské vzkazy",
        description:
          "Připravím sadu ručně psaných karet — poetických, humorných nebo laděných k tématu vaší oslavy.",
      },
      {
        title: "Styling & losování",
        description:
          "Malé kytice naaranžuji na stůl. Každá hostka si vylosuje tu svou a přečte si vzkaz nahlas.",
      },
      {
        title: "Sdílený moment",
        description:
          "Zážitek přirozeně otevře konverzaci — o přáních, obavách i o tom, co vás spojuje.",
      },
    ],
    included: [
      "8–20 mini kytiček dle počtu hostek",
      "Ručně psané autorské karty",
      "Styling stolu",
      "Facilitace momentu Lucií",
    ],
    idealFor: [
      "Rozlučky se svobodou pro 6–12 kamarádek",
      "Baby shower",
      "Retreat a ženské víkendy",
    ],
    priceBlocks: [
      {
        label: "Základní cena",
        value: "4 900 Kč",
        note: "platí pro 5 kamarádek + budoucí nevěsta",
      },
    ],
    extraGuest: { label: "Každá další účastnice", price: "+ 490 Kč / os." },
    deliveryZones: defaultDelivery,
  },
  {
    slug: "mini-flower-experience",
    title: "Mini Flower Experience",
    eyebrow: "Intimní zážitek",
    shortDescription:
      "Komorní květinový zážitek pro 2–6 osob u vás doma nebo na vybraném místě.",
    longDescription:
      "Mini Flower Experience je nejintimnější formát LU. Přijedu k vám s vybraným setem květin a společně strávíme tichý večer u vázání kytic, dobrého vína a rozhovorů. Ideální jako dárek nebo způsob, jak oslavit s nejbližšími.",
    image: miniExperience,
    duration: "90 minut",
    guests: "2–6 osob",
    from: "7 900 Kč",
    audience: ["Dárek", "Blízcí přátelé", "Rodina"],
    steps: [
      {
        title: "Dohoda o místě & datu",
        description:
          "U vás doma, na chatě, v ateliéru — přijedu s kompletním setem.",
      },
      {
        title: "Tichý večer",
        description:
          "Provedu vás tvorbou vlastních kytic ve vzdušném, nespěchavém tempu.",
      },
      {
        title: "Odchod se vzpomínkou",
        description:
          "Každý si odnese svou kytici a klid, který v takovém večeru vzniká.",
      },
    ],
    included: [
      "Sada sezónních květin pro každou účastnici",
      "Vázy, stuhy, papír, nůžky",
      "Osobní vedení Lucií 90 minut",
      "Doprava v rámci Prahy",
    ],
    idealFor: [
      "Dárek pro maminku, sestru, kamarádku",
      "Malá oslava narozenin",
      "Klidný večer se ženami z rodiny",
    ],
    priceBlocks: [
      {
        label: "Základní cena",
        value: "7 900 Kč",
        note: "platí pro 6 žen",
      },
    ],
    extraGuest: { label: "Každá další žena", price: "+ 590 Kč / os." },
    deliveryZones: defaultDelivery,
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}
