import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { experiences } from "@/lib/experiences";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/zazitky")({
  head: () => ({
    meta: [
      { title: "Zážitky — LU by Lucie" },
      { name: "description", content: "Pět květinových formátů od LU by Lucie — Signature Flower Bar, DIY Kit, Gender Reveal Bloom, Flower Fortune, Mini Experience." },
      { property: "og:title", content: "Zážitky — LU by Lucie" },
      { property: "og:description", content: "Pět květinových formátů pro svatby, rozlučky a firemní eventy." },
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
          <p className="eyebrow">Přehled zážitků</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            Pět formátů, <em className="italic">jedna estetika</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cocoa/80">
            Každý zážitek jsem vyladila tak, aby fungoval sám o sobě — a zároveň
            spolu tvořily jednu rodinu. Vyberte si podle příležitosti, prostoru a
            počtu hostů.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {experiences.map((e, i) => (
            <Link
              key={e.slug}
              to="/zazitky/$slug"
              params={{ slug: e.slug }}
              className={`group relative flex flex-col overflow-hidden rounded-[2px] border border-border/60 bg-card transition-shadow hover:shadow-[0_30px_80px_-40px_rgba(94,70,59,0.4)] ${
                i === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                <img
                  src={e.image}
                  alt={e.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                />
                <div className="absolute top-5 left-5 rounded-full bg-cream/85 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cocoa backdrop-blur">
                  {e.eyebrow}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 lg:p-10">
                <h2 className="font-serif text-3xl text-espresso">{e.title}</h2>
                <p className="mt-3 text-cocoa/80">{e.shortDescription}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-cocoa/60">
                  <span>{e.guests}</span>
                  <span>{e.duration}</span>
                  <span className="text-champagne">{e.from}</span>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs uppercase tracking-[0.22em] text-espresso">
                  Prohlédnout detail <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
