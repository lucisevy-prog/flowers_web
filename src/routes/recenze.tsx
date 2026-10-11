import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import miniTaska from "@/assets/mini-taska_LU.webp";
import { reviews } from "@/lib/reviews";
import { ReviewCard } from "@/components/review-card";

// Záměrně bez Review/AggregateRating JSON-LD: Google recenze na vlastním
// webu firmy o sobě samé ("self-serving reviews") ve výsledcích nezobrazuje
// a hvězdičky z nich můžou vést k ruční penalizaci.
export const Route = createFileRoute("/recenze")({
  head: () => ({
    meta: [
      { title: "Recenze — LU by Lucie" },
      {
        name: "description",
        content:
          "Zkušenosti klientů s květinovými zážitky LU by Lucie — svatby, rozlučky se svobodou, oslavy a firemní eventy.",
      },
      { property: "og:title", content: "Recenze — LU by Lucie" },
      {
        property: "og:description",
        content: "Zkušenosti klientů s květinovými zážitky LU by Lucie.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.lubyluci.cz/recenze" }],
  }),
  component: Recenze,
});

function Recenze() {
  const [lead, ...rest] = reviews;

  return (
    <div className="bg-background">
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-14 lg:px-10 lg:pt-24">
        <img
          src={miniTaska}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute top-6 right-10 hidden w-28 rotate-6 opacity-90 lg:block lg:w-36"
        />
        <div className="max-w-3xl">
          <p className="eyebrow">Recenze</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-espresso sm:text-5xl lg:text-6xl">
            Co říkají ti, kdo už <em className="italic text-cocoa">květinový zážitek</em> zažili.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cocoa/85 sm:text-lg">
            Od slavnostního večera Velvet Society po pop-up v kavárně — pár slov od těch, kdo si
            květinový bar vyzkoušeli na vlastní kůži.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {lead ? <ReviewCard review={lead} variant="lead" /> : null}

        {/* Pravidelné řady se stejně vysokými kartami: na desktopu 6sloupcová
            mřížka — první dvě karty po 3 sloupcích (řada 2), další po 2
            (řady po 3). Tablet: 2 vedle sebe, lichá poslední přes celou šířku. */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {rest.map((review, i) => {
            const isLastOdd = i === rest.length - 1 && rest.length % 2 === 1;
            return (
              <div
                key={i}
                className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${isLastOdd ? "md:col-span-2" : ""}`}
              >
                <ReviewCard review={review} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-8 text-center lg:px-10">
        <p className="eyebrow">Váš zážitek</p>
        <h2 className="mt-4 font-serif text-4xl text-espresso sm:text-5xl">
          Chcete zažít něco podobného?
        </h2>
        <p className="mt-6 text-cocoa/80">
          Napište mi o své akci a do 24 hodin vám doporučím zážitek, který k ní bude sedět nejlépe.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/kontakt"
            className="group inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs tracking-[0.22em] text-cream uppercase transition-all hover:bg-cocoa"
          >
            Nezávazně poptat
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/zazitky"
            className="text-xs tracking-[0.22em] text-cocoa uppercase underline decoration-champagne decoration-2 underline-offset-8 hover:text-espresso"
          >
            Prohlédnout zážitky
          </Link>
        </div>
      </section>
    </div>
  );
}
