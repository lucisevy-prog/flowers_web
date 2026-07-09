import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-flower-bar.jpg";
import bouquetHands from "@/assets/bouquet-hands.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import { experiences } from "@/lib/experiences";
import { Flower2, Sparkles, Camera, HandHeart, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      <UspBar />
      <Split />
      <HowItWorks />
      <FeaturedExperiences />
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
          <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.05] text-espresso sm:text-[3.5rem] lg:text-[4.5rem]">
            Květinové zážitky, <br className="hidden sm:block" />
            <em className="italic text-cocoa">které si odnesete</em> domů.
          </h1>
          <p className="mt-8 max-w-lg font-sans text-lg leading-relaxed text-cocoa/85">
            LU je prémiová značka květinových zážitků pro svatby, rozlučky, oslavy
            a firemní eventy. Vytvářím intimní momenty i velkolepé bary — vždy s
            důrazem na detail, vůni a fotogenickou eleganci.
          </p>

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
  { icon: Sparkles, title: "Prémiové květiny", text: "Sezónní, autorský výběr" },
  { icon: HandHeart, title: "Osobní přístup", text: "Vždy pod vedením Lucie" },
  { icon: Camera, title: "Fotogenický styling", text: "Připraveno pro objektiv" },
  { icon: Flower2, title: "Zážitek domů", text: "Kytice jako vzpomínka" },
];

function UspBar() {
  return (
    <section className="border-y border-border/60 bg-cream/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 lg:px-10">
        {usps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-start gap-3">
            <Icon className="h-5 w-5 text-champagne" strokeWidth={1.25} />
            <div>
              <p className="font-serif text-lg text-espresso">{title}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-cocoa/60">{text}</p>
            </div>
          </div>
        ))}
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

function FeaturedExperiences() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <div className="mb-14 flex items-end justify-between gap-8">
        <div>
          <p className="eyebrow">Vybrané zážitky</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Pět formátů, jedna estetika.
          </h2>
        </div>
        <Link to="/zazitky" className="hidden text-xs uppercase tracking-[0.22em] text-cocoa hover:text-espresso sm:inline-flex items-center gap-2">
          Všechny zážitky <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experiences.slice(0, 3).map((e) => (
          <Link
            key={e.slug}
            to="/zazitky/$slug"
            params={{ slug: e.slug }}
            className="group block overflow-hidden rounded-[2px] border border-border/60 bg-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
            </div>
            <div className="p-6">
              <p className="eyebrow">{e.eyebrow}</p>
              <h3 className="mt-2 font-serif text-2xl text-espresso">{e.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-champagne">{e.from}</p>
            </div>
          </Link>
        ))}
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

