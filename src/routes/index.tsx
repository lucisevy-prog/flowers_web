import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-flower-bar.jpg";
import bouquetHands from "@/assets/bouquet-hands.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import venueGarden from "@/assets/venue-garden.jpg";
import venueChateau from "@/assets/venue-chateau.jpg";
import venueLoft from "@/assets/venue-loft.jpg";
import { Flower2, Sparkles, Camera, HandHeart, ArrowUpRight, Heart, Gift } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <UspBar />
      <Split />
      <Venues />
      <HowItWorks />
      <CtaBanner />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-16 pb-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="fade-up lg:col-span-6 lg:pt-14">
          <p className="eyebrow">Praha · Střední Čechy</p>
          <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.1] text-espresso sm:text-[3.5rem] lg:text-[4.2rem]">
            Květinový bar, <br className="hidden sm:block" />
            o kterém budou hosté mluvit <em className="italic text-cocoa">ještě cestou domů.</em>
          </h1>
          
          <div className="mt-8 border-l border-champagne/40 pl-6 space-y-4 max-w-xl">
            <p className="font-sans text-lg leading-relaxed text-cocoa/90">
              Květinové zážitky navržené podle charakteru dané příležitosti. Vždy dokreslí danou událost, vtáhnou hosty do lehkého květinového tvoření a ještě s nimi květiny odcházejí domů.
            </p>
            <p className="font-sans text-base leading-relaxed text-cocoa/70 italic">
              Květinové momenty, které se v Čechách teprve začínají objevovat. Otevřou ale vaše kreativní Já i srdce.
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
              „Zážitek, který voní ještě týden po akci."
            </span>
          </div>
        </div>

        <div className="fade-up relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <img
              src={heroImg}
              alt="Signature Flower Bar LU"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-56 rounded-[2px] border border-champagne/40 bg-cream p-5 shadow-[0_20px_50px_-20px_rgba(94,70,59,0.35)] sm:block lg:-left-12">
            <p className="eyebrow">Signature</p>
            <p className="mt-2 font-serif text-2xl leading-tight text-espresso">
              Flower Bar
            </p>
            <p className="mt-2 text-xs text-cocoa/70">
              Náš vlajkový zážitek pro 15–300 hostů.
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, var(--blush) 0%, transparent 70%)",
          opacity: 0.55,
        }}
      />
    </section>
  );
}

const usps = [
  { title: "Moment, který si každý fotí", emoji: "📸" },
  { title: "Hosté jsou součástí dění", emoji: "🌸" },
  { title: "Atmosféra, která propojuje", emoji: "🤍" },
  { title: "Kytička pro ně jako pozornost domů", emoji: "💐" },
];

function UspBar() {
  return (
    <section className="relative border-y border-border/50 bg-gradient-to-b from-cream/40 to-cream/80 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map(({ title, emoji }) => (
            <div
              key={title}
              className="group relative flex items-center gap-5 rounded-[4px] border border-border/40 bg-card/35 p-6 backdrop-blur-[2px] transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne/40 hover:bg-card/90 hover:shadow-[0_12px_24px_-10px_rgba(94,70,59,0.12)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne/25 bg-cream/90 shadow-[0_4px_12px_rgba(94,70,59,0.04)] text-xl transition-transform duration-500 group-hover:scale-105">
                {emoji}
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-[1.05rem] text-espresso leading-snug font-medium">
                  {title}
                </h3>
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
          Intimní zážitek pro šest žen <em className="italic text-cocoa">i</em> velkolepý večer pro stovky hostů.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <SplitCard
          image={bouquetHands}
          eyebrow="Pro vás osobně"
          title="Svatby, rozlučky & oslavy"
          text="Signature Flower Bar na svatbu, poetická Flower Fortune pro rozlučku, komorní Mini Experience pro nejbližší kruh. Každý zážitek je vytvořen v paletě, která ladí s vaším dnem."
          audience={["Svatby", "Rozlučky", "Baby shower", "Narozeniny"]}
          to="/zazitky"
          cta="Zážitky pro vás"
        />
        <SplitCard
          image={corporateEvent}
          eyebrow="Pro vaši značku"
          title="Firemní eventy & PR"
          text="Aktivace, které si hosté odnesou v kytici i na fotkách. Od launche produktu po galavečer — vytvářím florální kout, který funguje jako prémiový brand touchpoint."
          audience={["Launches", "Galavečery", "Konference", "Gifting"]}
          to="/zazitky"
          cta="Zážitky pro firmy"
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
  cta,
  variant,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  audience: string[];
  to: string;
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
            <li key={a} className="rounded-full border border-cocoa/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.14em] text-cocoa/70">
              {a}
            </li>
          ))}
        </ul>
        <Link
          to={to}
          className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-espresso"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Konzultace",
      text: "Sejdeme se osobně či online, doladíme paletu a atmosféru.",
    },
    {
      n: "02",
      title: "Příprava",
      text: "Ručně sestavuji květiny, styling a všechny detaily akce.",
    },
    {
      n: "03",
      title: "Zážitek",
      text: "Přijedu, postavím prostor a provedu vás i hosty celým momentem.",
    },
  ];
  return (
    <section className="bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow !text-champagne">Jak to funguje</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            Tři kroky od <em className="italic">první zprávy</em> po vzpomínku, která zůstane.
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

const venues = [
  {
    image: venueGarden,
    eyebrow: "Zahrada & château park",
    title: "Venkovní svatby & letní oslavy",
    text: "Dřevěné stoly pod korunami stromů, květinový bar ve stínu — od malých rodinných hostin po velké svatby v parku.",
  },
  {
    image: venueChateau,
    eyebrow: "Historické interiéry",
    title: "Château, salóny & vily",
    text: "Vysoká okna, parkety, denní světlo. Elegantní zázemí pro rozlučky, baby shower a intimní oslavy v centru Prahy i okolí.",
  },
  {
    image: venueLoft,
    eyebrow: "Loft & industrial",
    title: "Firemní eventy & PR akce",
    text: "Průmyslová okna, cihlové zdi, minimalistický styling. Květinová aktivace, kterou si hosté odnesou v kytici i na fotkách.",
  },
  {
    image: bouquetHands,
    eyebrow: "Doma & u vás",
    title: "Byty, ateliéry, terasy",
    text: "Mini Flower Experience, DIY Kit nebo Flower Fortune — přijedu k vám, nebo pošlu kit kurýrem po celé ČR.",
  },
];

function Venues() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <div className="mb-14 max-w-2xl">
        <p className="eyebrow">Kde LU tvoří</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
          Kdekoliv chcete — od <em className="italic">zahrady</em> po loft.
        </h2>
        <p className="mt-6 text-cocoa/80">
          Květinové zážitky přizpůsobím prostoru, ve kterém se odehrává váš den. Tady je pár inspirací, kam LU už dorazila.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {venues.map((v) => (
          <figure
            key={v.title}
            className="group flex flex-col overflow-hidden rounded-[2px] border border-border/60 bg-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={v.image}
                alt={v.title}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
              />
            </div>
            <figcaption className="flex flex-1 flex-col p-6">
              <p className="eyebrow">{v.eyebrow}</p>
              <p className="mt-2 font-serif text-xl leading-tight text-espresso">{v.title}</p>
              <p className="mt-3 text-sm text-cocoa/75">{v.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/zazitky"
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-espresso underline decoration-champagne decoration-2 underline-offset-8 hover:text-cocoa"
        >
          Prohlédnout všech 5 zážitků <ArrowUpRight className="h-4 w-4" />
        </Link>
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
            Ať váš další okamžik <em className="italic">rozkvete</em>.
          </h2>
          <p className="mt-5 text-cocoa/80">
            Napište mi. Odpovídám během 24 hodin s návrhem palety, formátu a orientační kalkulací.
          </p>
          <Link
            to="/kontakt"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
          >
            Poptat zážitek <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(50% 80% at 100% 100%, var(--rose) 0%, transparent 60%)",
            opacity: 0.35,
          }}
        />
      </div>
    </section>
  );
}

