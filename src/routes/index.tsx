import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-flower-bar.jpg";
import miniTaska from "@/assets/mini-taska_LU.png";
import bouquetHands from "@/assets/bouquet-hands.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import venueCorporateGala from "@/assets/venue-corporate-gala.jpg";
import venueWellnessStudio from "@/assets/venue-wellness-studio.jpg";
import venueCafePopup from "@/assets/venue-cafe-popup.jpg";
import venueGenderReveal from "@/assets/venue-gender-reveal.jpg";
import venueBachelorette from "@/assets/venue-bachelorette.jpg";
import { ArrowUpRight, Instagram } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.lubyluci.cz/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <UspBar />
      <Split />
      <Statement />
      <Venues />
      <InstagramSection />
      <HowItWorks />
      <CtaBanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-8 pb-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-10 lg:pb-32">
        <div className="fade-up lg:col-span-6">
          <p className="eyebrow">Praha · Střední Čechy</p>
          <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.1] text-espresso sm:text-[3.5rem] lg:text-[4.2rem]">
            Květinové zážitky, <br className="hidden sm:block" />
            které si <em className="italic text-cocoa">odnesete domů.</em>
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl leading-snug text-espresso italic">
            Interaktivní flower bar a zážitkové balíčky s prémiovými květinami pro svatby, rozlučky,
            eventy a výjimečné oslavy.
          </p>

          <div className="mt-8 border-l border-champagne/40 pl-6 space-y-4 max-w-xl">
            <p className="font-sans text-lg leading-relaxed text-cocoa/90">
              Květinové zážitky navržené podle charakteru dané příležitosti. Vždy dokreslí danou
              událost, vtáhnou hosty do lehkého květinového tvoření a ještě s nimi květiny odcházejí
              domů.
            </p>
            <p className="font-sans text-base leading-relaxed text-cocoa/70 italic">
              Květinové momenty, které se v Čechách teprve začínají objevovat. A vy budete první,
              kdo je hostům nabídne.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/zazitky"
              className="group inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.22em] text-cream transition-all hover:bg-cocoa"
            >
              Prozkoumat zážitky
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/kontakt"
              className="text-xs uppercase tracking-[0.22em] text-cocoa underline decoration-champagne decoration-2 underline-offset-8 hover:text-espresso"
            >
              Nezávazně poptat
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-4 text-sm text-cocoa/70">
            <span className="hairline" />
            <span className="italic font-serif text-base text-cocoa">
              „Vy si vyberete, my se postaráme."
            </span>
          </div>
        </div>

        <div className="fade-up relative lg:col-span-6 lg:self-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2px]">
            <img
              src={heroImg}
              alt="Premium Flower Bar LU — květinový bar a kytice v papírové tašce"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-56 rounded-[2px] border border-champagne/40 bg-cream p-5 shadow-[0_20px_50px_-20px_rgba(94,70,59,0.35)] sm:block lg:-left-12">
            <p className="eyebrow">Premium</p>
            <p className="mt-2 font-serif text-2xl leading-tight text-espresso">Flower Bar</p>
            <p className="mt-2 text-xs text-cocoa/70">Náš vlajkový zážitek do 70 hostů.</p>
          </div>
          <img
            src={miniTaska}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 -right-4 hidden w-24 rotate-6 drop-shadow-[0_12px_20px_rgba(94,70,59,0.18)] sm:block lg:-right-8 lg:w-28"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
      />
    </section>
  );
}

const usps = [
  {
    title: "Prémiové květiny vždy",
    text: "Nekompromisní kvalita při každém zážitku, bez výjimky. Pracuji jen s těmi nejkrásnějšími a nejčerstvějšími stonky.",
    emoji: "🌸",
  },
  {
    title: "Odnesete si kus krásy domů",
    text: "Naše koncepty jsou navržené tak, aby zážitek bavil, někdy dojal a stal se třešinkou každé události.",
    emoji: "🎁",
  },
  {
    title: "Dokonalost v detailech",
    text: "Od vizuálního zpracování barů až po doprovodné rituály – vše má svůj jasný estetický řád.",
    emoji: "✨",
  },
];

function UspBar() {
  return (
    <section className="relative border-y border-border/50 bg-gradient-to-b from-cream/40 to-cream/80 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow text-center lg:text-left">Na čem si zakládám</p>
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {usps.map(({ title, text, emoji }) => (
            <div
              key={title}
              className="group relative flex items-center gap-6 rounded-[4px] border border-border/40 bg-card/35 p-7 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne/40 hover:bg-card/90 hover:shadow-[0_12px_24px_-10px_rgba(94,70,59,0.12)]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-champagne/25 bg-cream/90 shadow-[0_4px_12px_rgba(94,70,59,0.04)] text-2xl transition-transform duration-500 group-hover:scale-105">
                {emoji}
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-espresso leading-snug font-medium">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-cocoa/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Split() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <div className="mb-16 max-w-2xl">
        <p className="eyebrow">Pro koho tvořím</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
          Intimní zážitek pro šest žen <em className="italic text-cocoa">i</em> velkolepý večer pro
          desítky hostů.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <SplitCard
          image={bouquetHands}
          eyebrow="Pro vás osobně"
          title="Svatby, rozlučky & oslavy"
          text="Vytvoříme pro vás a vaše kamarádky nezapomenutelný květinový rituál, na který budete vzpomínat pokaždé, když se podíváte na fotky."
          audience={["Svatby", "Rozlučky", "Gender Reveal", "Narozeniny"]}
          to="/zazitky"
          cta="Zážitky pro vás"
        />
        <SplitCard
          image={corporateEvent}
          eyebrow="Pro vaši značku"
          title="Firemní eventy & PR"
          text="Oživte svůj prostor vůní a estetikou. Připravíme pro vaše klienty zážitek, o kterém budou mluvit a sdílet ho na sítích. Vy se staráte o své hosty, my o atmosféru."
          audience={["Launches", "Galavečery", "Konference", "Gifting"]}
          to="/kontakt"
          search={{ zazitek: "premium-flower-bar" }}
          cta="Poptat firemní event"
          variant="rose"
        />
      </div>
    </section>
  );
}

function SplitCard({
  image,
  eyebrow,
  title,
  text,
  audience,
  to,
  search,
  cta,
  variant,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  audience: string[];
  to: string;
  search?: { zazitek: string };
  cta: string;
  variant?: "rose";
}) {
  return (
    <article className="group relative overflow-hidden rounded-[2px] border border-border/60 bg-card">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
        />
      </div>
      <div className={`p-8 lg:p-10 ${variant === "rose" ? "bg-blush/50" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-3 font-serif text-3xl text-espresso">{title}</h3>
        <p className="mt-4 text-cocoa/80">{text}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {audience.map((a) => (
            <li
              key={a}
              className="rounded-full border border-cocoa/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-cocoa/70"
            >
              {a}
            </li>
          ))}
        </ul>
        <Link
          to={to}
          search={search}
          className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-espresso"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Statement() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
      <p className="font-serif text-3xl leading-snug text-espresso sm:text-4xl">
        Nejde jen o to uvázat kytku. Jde o pocit zpomalit,{" "}
        <em className="italic text-cocoa">být plně spolu</em> a prožít čas, který jen tak rychle
        nevyprchá.
      </p>
    </section>
  );
}

const visualInspirations = [
  {
    image: venueCorporateGala,
    forWhom: "Firemní eventy & gala",
    where: "Reprezentativní sály, hotely & showroomy",
  },
  {
    image: venueBachelorette,
    forWhom: "Rozlučky se svobodou & oslavy",
    where: "V soukromí, na zahradě i v apartmánu",
  },
  {
    image: venueGenderReveal,
    forWhom: "Gender Reveal",
    where: "Rodinné oslavy, zahrady i domov",
  },
  {
    image: venueWellnessStudio,
    forWhom: "Ženské kruhy & retreaty",
    where: "Jógová a wellness studia, komorní prostory",
  },
  {
    image: venueCafePopup,
    forWhom: "Kavárny & pop-up prostory",
    where: "Kavárny, bistra, terasy i venkovní zákoutí",
  },
];

function Venues() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow">Kde & pro koho</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
          Květinový zážitek <em className="italic text-cocoa">kdekoliv si přejete</em>.
        </h2>
      </div>

      {/* Visual inspiration grid with 5 real photos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visualInspirations.map((v, i) => (
          <figure
            key={v.forWhom}
            className={`group flex flex-col overflow-hidden rounded-[4px] border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-champagne/60 hover:shadow-[0_16px_36px_-12px_rgba(94,70,59,0.14)] ${
              i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden bg-cream/40 ${
                i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={v.image}
                alt={v.forWhom}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>
            <figcaption className="flex flex-1 flex-col justify-center p-5 sm:p-6 bg-card/90">
              <p className="font-serif text-xl text-espresso sm:text-2xl font-medium">
                {v.forWhom}
              </p>
              <p className="mt-1.5 text-xs tracking-wide uppercase text-cocoa/70 font-sans">
                {v.where}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/zazitky"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-espresso underline decoration-champagne decoration-2 underline-offset-8 hover:text-cocoa"
        >
          Prozkoumat všech 5 zážitků <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
      <div className="rounded-[4px] border border-champagne/40 bg-gradient-to-br from-cream via-blush/40 to-cream p-8 sm:p-12 shadow-[0_16px_40px_-20px_rgba(94,70,59,0.12)]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-3.5 py-1 text-xs uppercase tracking-[0.18em] text-espresso border border-champagne/30">
              <Instagram className="h-3.5 w-3.5 text-champagne" />
              <span>@lu.byluci</span>
            </div>
            <h3 className="mt-4 font-serif text-3xl leading-tight text-espresso sm:text-4xl">
              Sledujte zákulisí, videa a reelska na{" "}
              <em className="italic text-cocoa">Instagramu</em>.
            </h3>
            <p className="mt-3 text-base leading-relaxed text-cocoa/85">
              Chcete vidět atmosféru v pohybu? Na Instagramu sdílím podrobnější videa z proběhlých
              akcí, floristické tipy i momenty z tvorby barů a balíčků.
            </p>
          </div>
          <a
            href="https://instagram.com/lu.byluci"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.22em] text-cream transition-all hover:bg-cocoa"
          >
            <Instagram className="h-4 w-4" />
            Sledovat na Instagramu
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Napíšete nám o své akci",
      text: "Vyplníte krátký formulář a my vám doporučíme ten pravý zážitek.",
    },
    {
      n: "02",
      title: "Vše připravíme za vás",
      text: "Nakoupíme prémiové květiny, připravíme koncept a vše kompletně předáme nebo doručíme.",
    },
    {
      n: "03",
      title: "Vy si jen užíváte",
      text: "Květiny vždy vám nebo vašim hostům zůstávají.",
    },
  ];
  return (
    <section className="bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow !text-champagne">Jak to funguje</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Vy si vyberete, <em className="italic">my se postaráme.</em>
          </h2>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-cream/20 pt-8">
              <p className="font-serif text-6xl text-champagne">{s.n}</p>
              <h3 className="mt-6 font-serif text-2xl text-cream">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
      <div className="relative overflow-hidden rounded-[2px] border border-champagne/30 bg-blush/60 px-8 py-16 sm:px-16 sm:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">Připraveni?</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Váš zážitek začíná <em className="italic">jednou zprávou</em>.
          </h2>
          <p className="mt-5 text-cocoa/80">
            Napište mi. Odpovídám během 24 hodin s návrhem palety, formátu a orientační kalkulací.
          </p>
          <a
            href="https://wa.me/420777992589?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20kv%C4%9Btinov%C3%BD%20z%C3%A1%C5%BEitek%20LU."
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
          >
            Poslat poptávku <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div aria-hidden className="cta-glow pointer-events-none absolute inset-0 -z-0" />
      </div>
    </section>
  );
}
