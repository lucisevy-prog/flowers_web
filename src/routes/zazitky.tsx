import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { experiences } from "@/lib/experiences";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/zazitky")({
  head: () => ({
    meta: [
      { title: "Zážitky — LU by Lucie" },
      {
        name: "description",
        content:
          "Pět květinových formátů od LU by Lucie — Premium Flower Bar, DIY Kit, Baby Shower Bloom, Flower Fortune, Hvězdný Flower Bar.",
      },
      { property: "og:title", content: "Zážitky — LU by Lucie" },
      {
        property: "og:description",
        content: "Pět květinových formátů pro svatby, rozlučky a firemní eventy.",
      },
    ],
  }),
  component: ZazitkyLayout,
});

function ZazitkyLayout() {
  const matchRoute = useMatchRoute();
  const isDetail = matchRoute({ to: "/zazitky/$slug" });
  if (isDetail) return <Outlet />;
  return <ZazitkyIndex />;
}

function ZazitkyIndex() {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-14 lg:px-10 lg:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow">5 květinových zážitků</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            Pět formátů, <em className="italic">jedna estetika</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cocoa/80">
            Každý zážitek jsem vyladila tak, aby fungoval sám o sobě — a zároveň spolu tvořily jednu
            rodinu. Vyberte si podle příležitosti, prostoru a počtu hostů.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {experiences.map((e, i) => (
              <li
                key={e.slug}
                className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-cocoa/75"
              >
                <span className="font-serif text-champagne">{String(i + 1).padStart(2, "0")}</span>
                {e.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-10">
        <div className="flex flex-col gap-6 border-t border-border/60">
          {experiences.map((e, i) => (
            <Link
              key={e.slug}
              to="/zazitky/$slug"
              params={{ slug: e.slug }}
              className="group grid grid-cols-1 gap-8 py-10 border-b border-border/60 lg:grid-cols-12 lg:gap-12 transition-colors hover:bg-card/30 px-3 rounded-[2px]"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2px] lg:col-span-4 shrink-0">
                <img
                  src={e.image}
                  alt={e.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-cocoa backdrop-blur">
                  <span className="font-serif text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{e.eyebrow}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center lg:col-span-8">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-champagne leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-cocoa/60">
                    — {e.eyebrow}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-3xl text-espresso group-hover:text-champagne transition-colors duration-300">
                  {e.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cocoa/80">{e.shortDescription}</p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.7rem] uppercase tracking-[0.14em] text-cocoa/60">
                  <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-sm">
                    👥 {e.guests}
                  </span>
                  <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-sm">
                    ⏱️ {e.duration}
                  </span>
                  <span className="text-espresso font-semibold bg-blush/40 px-2.5 py-1 rounded-sm">
                    🏷️ {e.from}
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-espresso font-bold">
                  Detail zážitku{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
