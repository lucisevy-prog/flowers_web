import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { experiences } from "@/lib/experiences";
import { ArrowUpRight, Instagram } from "lucide-react";
import miniStojanNaStuhy from "@/assets/mini-stojan_na_stuhy.png";

export const Route = createFileRoute("/zazitky")({
  head: () => ({
    meta: [
      { title: "Květinové zážitky — LU by Lucie" },
      {
        name: "description",
        content:
          "5 originálních květinových zážitků od LU by Lucie pro svatby, rozlučky, baby shower a firemní eventy.",
      },
      { property: "og:title", content: "Květinové zážitky — LU by Lucie" },
      {
        property: "og:description",
        content: "5 originálních květinových zážitků pro svatby, rozlučky a firemní eventy.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.lubyluci.cz/zazitky" }],
  }),
  component: ZazitkyLayout,
});

function ZazitkyLayout() {
  const matchRoute = useMatchRoute();
  const isDetail = matchRoute({ to: "/zazitky/$slug" });
  if (isDetail) return <Outlet />;
  return <ZazitkyIndex />;
}

// Brand color palette card tints
const cardThemes: Record<string, { bg: string; border: string; badgeBg: string }> = {
  "premium-flower-bar": {
    bg: "bg-[#f8f3eb]",
    border: "border-champagne/50 hover:border-champagne",
    badgeBg: "bg-champagne/95 text-espresso",
  },
  "diy-flower-bar-kit": {
    bg: "bg-[#faf6f1]",
    border: "border-[#e5dcd3] hover:border-champagne/60",
    badgeBg: "bg-cream/90 text-cocoa",
  },
  "baby-shower-bloom": {
    bg: "bg-[#fcf2f4]",
    border: "border-[#edd6db] hover:border-[#dfb5bc]",
    badgeBg: "bg-blush/95 text-espresso",
  },
  "flower-fortune": {
    bg: "bg-[#f8f1f5]",
    border: "border-[#e7d5df] hover:border-champagne/60",
    badgeBg: "bg-[#ede0eb] text-espresso",
  },
  "hvezdny-flower-bar": {
    bg: "bg-[#f4eee7]",
    border: "border-[#ded3c6] hover:border-cocoa/50",
    badgeBg: "bg-[#e8ddd0] text-espresso",
  },
};

function ZazitkyIndex() {
  return (
    <div className="bg-background">
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-10 lg:pt-24">
        <img
          src={miniStojanNaStuhy}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-6 hidden w-40 rotate-3 opacity-90 lg:block lg:right-10 lg:w-52"
        />
        <div className="max-w-3xl">
          <p className="eyebrow">Katalog 5 zážitků</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-espresso sm:text-5xl lg:text-6xl">
            Který z <em className="italic text-cocoa">pěti květinových zážitků</em> bude ten váš?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cocoa/85 sm:text-lg">
            Každý formát je navržen pro jinou atmosféru, prostor i počet hostů — od komorních
            dámských kruhů až po velkolepé svatby a firemní gala.
          </p>
        </div>

        <div className="mt-8 flex flex-nowrap gap-2.5 overflow-x-auto pb-1 -mx-6 px-6 lg:-mx-10 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {experiences.map((e, i) => (
            <Link
              key={e.slug}
              to="/zazitky/$slug"
              params={{ slug: e.slug }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-xs font-medium text-espresso transition-all duration-300 hover:border-champagne hover:bg-champagne/15 hover:shadow-xs"
            >
              <span className="font-serif font-bold text-champagne">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{e.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => {
            const theme = cardThemes[e.slug] ?? {
              bg: "bg-card",
              border: "border-border/70",
              badgeBg: "bg-cream/90 text-cocoa",
            };
            return (
              <article
                id={`zazitek-${e.slug}`}
                key={e.slug}
                className={`scroll-mt-32 group relative flex flex-col overflow-hidden rounded-[4px] border ${theme.border} ${theme.bg} transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(94,70,59,0.16)]`}
              >
                {/* Image box - clickable */}
                <Link
                  to="/zazitky/$slug"
                  params={{ slug: e.slug }}
                  className="relative aspect-[16/11] w-full overflow-hidden bg-cream/40 block"
                >
                  <img
                    src={e.image}
                    alt={e.title}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div
                    className={`absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full ${theme.badgeBg} px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] uppercase shadow-sm backdrop-blur-md`}
                  >
                    <span className="font-serif font-bold text-champagne">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{e.eyebrow}</span>
                  </div>
                </Link>

                {/* Content box */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <Link to="/zazitky/$slug" params={{ slug: e.slug }}>
                    <h2 className="font-serif text-2xl leading-snug text-espresso group-hover:text-champagne transition-colors duration-300">
                      {e.title}
                    </h2>
                  </Link>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cocoa/80">
                    {e.shortDescription}
                  </p>

                  {/* Specs */}
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-cocoa/75">
                    <span className="flex items-center gap-1.5 rounded-[2px] bg-card/80 border border-border/50 px-2.5 py-1 text-[0.7rem] uppercase tracking-wider">
                      👥 {e.guests}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-[2px] bg-card/80 border border-border/50 px-2.5 py-1 text-[0.7rem] uppercase tracking-wider">
                      ⏱️ {e.duration}
                    </span>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-cocoa/60">
                        Cena
                      </span>
                      <span className="font-serif text-lg font-medium text-espresso">{e.from}</span>
                    </div>

                    <Link
                      to="/zazitky/$slug"
                      params={{ slug: e.slug }}
                      className="inline-flex items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.18em] text-cream transition-all hover:bg-cocoa"
                    >
                      Detail
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Instagram info banner on Experiences page */}
        <div className="mt-16 rounded-[4px] border border-champagne/40 bg-gradient-to-r from-cream via-blush/30 to-cream p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-champagne font-medium text-xs uppercase tracking-[0.2em]">
                <Instagram className="h-4 w-4" />
                <span>Instagram @lu.byluci</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl text-espresso sm:text-3xl">
                Chcete vidět atmosféru v pohybu?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/80">
                Na mém Instagramu najdete pravidelná videa, reelska, zákulisí příprav i podrobnější
                ukázky všech květinových zážitků.
              </p>
            </div>
            <a
              href="https://instagram.com/lu.byluci"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-espresso px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-cream transition-all hover:bg-cocoa"
            >
              <Instagram className="h-4 w-4" />
              Sledovat na Instagramu
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
