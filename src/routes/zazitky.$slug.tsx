import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getExperience, experiences, type Experience } from "@/lib/experiences";
import { ArrowUpRight, Check, Clock, Users, Sparkle } from "lucide-react";
import miniKoloStesti from "@/assets/mini-kolo_stesti.png";
import miniNuzky from "@/assets/mini-nuzky.png";
import miniSlunecnik from "@/assets/mini-slunecnik.png";
import miniStojanNaStuhy from "@/assets/mini-stojan_na_stuhy.png";
import miniZrcadlo from "@/assets/mini-zrcadlo.png";

// Drobné dekorativní rekvizity z reálných fotek klientky, přiřazené k
// zážitku, kde se skutečně objevují — jemný detail v rohu hero fotky,
// ne nic, co by konkurovalo hlavní fotografii.
const heroProps: Record<string, { src: string; className: string }[]> = {
  "flower-fortune": [
    {
      src: miniKoloStesti,
      className: "-bottom-8 -left-8 w-32 rotate-6 sm:w-40",
    },
  ],
  "diy-flower-bar-kit": [
    { src: miniNuzky, className: "-top-6 -right-6 w-24 rotate-6 sm:w-28" },
    {
      src: miniStojanNaStuhy,
      className: "-bottom-10 -left-10 w-36 -rotate-3 sm:w-44",
    },
  ],
  "premium-flower-bar": [
    {
      src: miniSlunecnik,
      className: "-top-10 -right-10 w-40 rotate-3 sm:w-48",
    },
  ],
  "baby-shower-bloom": [
    {
      src: miniZrcadlo,
      className: "-bottom-10 -right-8 w-28 rotate-3 sm:w-32",
    },
  ],
};

export const Route = createFileRoute("/zazitky/$slug")({
  loader: ({ params }) => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Zážitek — LU by Lucie" }, { name: "robots", content: "noindex" }] };
    const { exp } = loaderData;
    return {
      meta: [
        { title: `${exp.title} — LU by Lucie` },
        { name: "description", content: exp.shortDescription },
        { property: "og:title", content: `${exp.title} — LU by Lucie` },
        { property: "og:description", content: exp.shortDescription },
        { property: "og:image", content: exp.image },
        { property: "twitter:image", content: exp.image },
      ],
    };
  },
  component: ExperienceDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-4xl text-espresso">Zážitek nenalezen</h1>
      <Link
        to="/zazitky"
        className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-espresso underline decoration-champagne underline-offset-8"
      >
        Zpět na přehled
      </Link>
    </div>
  ),
});

function ExperienceDetail() {
  const { exp } = Route.useLoaderData() as { exp: Experience };
  const others = experiences.filter((e) => e.slug !== exp.slug).slice(0, 3);

  return (
    <article className="bg-background">
      {/* Hero */}
      <section className="relative isolate">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-16 pb-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pt-24">
          <div className="lg:col-span-6">
            <Link to="/zazitky" className="eyebrow inline-flex items-center gap-2 hover:text-cocoa">
              ← Zážitky
            </Link>
            <p className="eyebrow mt-8">{exp.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
              {exp.title}
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cocoa/85">
              {exp.longDescription}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-border py-6">
              <MetaItem icon={<Users className="h-4 w-4" />} label="Hosté" value={exp.guests} />
              <MetaItem icon={<Clock className="h-4 w-4" />} label="Délka" value={exp.duration} />
              <MetaItem icon={<Sparkle className="h-4 w-4" />} label="Od" value={exp.from} />
            </div>

            <div className="mt-10">
              <Link
                to="/kontakt"
                search={{ zazitek: exp.slug }}
                className="inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
              >
                Poptat tento zážitek
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
            </div>
            {(heroProps[exp.slug] ?? []).map((prop) => (
              <img
                key={prop.src}
                src={prop.src}
                alt=""
                aria-hidden="true"
                className={`pointer-events-none absolute hidden drop-shadow-[0_12px_20px_rgba(94,70,59,0.18)] sm:block ${prop.className}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tiers (if present) */}
      {exp.tiers ? (
        <section className="bg-cream/60 border-y border-border/60">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="mb-14 max-w-xl">
              <p className="eyebrow">Cenové úrovně</p>
              <h2 className="mt-4 font-serif text-4xl text-espresso">
                Vyberte formát podle vaší akce.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {exp.tiers.map((t) => (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-[2px] border p-8 lg:p-10 ${
                    t.featured ? "border-espresso bg-espresso text-cream" : "border-border bg-card"
                  }`}
                >
                  {t.featured ? (
                    <span className="absolute -top-3 left-8 rounded-full bg-champagne px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-espresso">
                      Nejoblíbenější
                    </span>
                  ) : null}
                  <p
                    className={`text-xs uppercase tracking-[0.22em] ${t.featured ? "text-champagne" : "text-champagne"}`}
                  >
                    {t.tagline}
                  </p>
                  <h3
                    className={`mt-3 font-serif text-4xl ${t.featured ? "text-cream" : "text-espresso"}`}
                  >
                    {t.name}
                  </h3>
                  <p className={`mt-2 text-sm ${t.featured ? "text-cream/70" : "text-cocoa/60"}`}>
                    {t.guests}
                  </p>
                  <p
                    className={`mt-6 font-serif text-3xl ${t.featured ? "text-cream" : "text-espresso"}`}
                  >
                    {t.price}
                  </p>
                  <ul
                    className={`mt-8 space-y-3 text-sm ${t.featured ? "text-cream/85" : "text-cocoa/80"}`}
                  >
                    {t.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-champagne" : "text-champagne"}`}
                          strokeWidth={1.5}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/kontakt"
                    search={{ zazitek: exp.slug }}
                    className={`mt-10 inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.22em] ${
                      t.featured ? "text-cream" : "text-espresso"
                    }`}
                  >
                    Poptat {t.name} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-2xl text-sm text-cocoa/70">
              Orientační velikost akce. Každý detail i finální rozpočet doladíme společně na míru.
            </p>
          </div>
        </section>
      ) : null}

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Jak to probíhá</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso">
              Krok za krokem, bez stresu.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-10">
              {exp.steps.map((s, i) => (
                <li
                  key={s.title}
                  className="grid grid-cols-[auto_1fr] gap-8 border-t border-border pt-8"
                >
                  <span className="font-serif text-3xl text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-espresso">{s.title}</h3>
                    <p className="mt-2 text-cocoa/80">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Included + Ideal for */}
      <section className="bg-blush/40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow">Co je součástí</p>
            <h3 className="mt-4 font-serif text-3xl text-espresso">V ceně dostáváte</h3>
            <ul className="mt-8 space-y-4">
              {exp.included.map((i) => (
                <li key={i} className="flex items-start gap-3 text-cocoa">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-champagne" strokeWidth={1.5} />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Pro koho je ideální</p>
            <h3 className="mt-4 font-serif text-3xl text-espresso">Nejlépe funguje pro</h3>
            <ul className="mt-8 space-y-4">
              {exp.idealFor.map((i) => (
                <li key={i} className="flex items-start gap-3 text-cocoa">
                  <span className="mt-3 h-px w-6 shrink-0 bg-champagne" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Simple price blocks (if no tiers) */}
      {exp.priceBlocks ? (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-10 max-w-xl">
            <p className="eyebrow">Ceník</p>
            <h3 className="mt-4 font-serif text-3xl text-espresso">Cena zážitku</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exp.priceBlocks.map((p) => (
              <div key={p.label} className="rounded-[2px] border border-border bg-card p-8">
                <p className="eyebrow">{p.label}</p>
                <p className="mt-3 font-serif text-3xl text-espresso">{p.value}</p>
                {p.note ? <p className="mt-2 text-sm text-cocoa/70">{p.note}</p> : null}
              </div>
            ))}
            {exp.extraGuest ? (
              <div className="rounded-[2px] border border-champagne/50 bg-blush/40 p-8">
                <p className="eyebrow">{exp.extraGuest.label}</p>
                <p className="mt-3 font-serif text-3xl text-espresso">{exp.extraGuest.price}</p>
                <p className="mt-2 text-sm text-cocoa/70">
                  {exp.extraGuest.note ?? "nad rámec základní ceny"}
                </p>
              </div>
            ) : null}
          </div>
          {exp.deliveryZones ? (
            <div className="mt-14">
              <p className="eyebrow">Doprava</p>
              <h4 className="mt-3 font-serif text-2xl text-espresso">Kde vás obsloužíme</h4>
              <ul className="mt-6 divide-y divide-border rounded-[2px] border border-border bg-card">
                {exp.deliveryZones.map((z) => (
                  <li
                    key={z.label}
                    className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="flex items-start gap-3">
                      <span aria-hidden className="text-lg leading-none">
                        {z.icon}
                      </span>
                      <div>
                        <p className="font-serif text-lg text-espresso">{z.label}</p>
                        {z.note ? <p className="text-sm text-cocoa/70">{z.note}</p> : null}
                      </div>
                    </div>
                    <p className="shrink-0 font-serif text-lg text-champagne sm:text-right">
                      {z.price}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="mt-8 max-w-xl text-sm italic text-cocoa/70">
            Konečnou kalkulaci vám pošlu do 24 hodin od poptávky spolu s QR kódem k platbě.
          </p>
        </section>
      ) : null}

      {/* Related */}
      <section className="border-t border-border/60 bg-cream/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="eyebrow">Prohlédněte také</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((e) => (
              <Link
                key={e.slug}
                to="/zazitky/$slug"
                params={{ slug: e.slug }}
                className="group block overflow-hidden rounded-[2px] border border-border bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{e.eyebrow}</p>
                  <h4 className="mt-2 font-serif text-xl text-espresso">{e.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-champagne">{icon}</div>
      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-cocoa/60">{label}</p>
      <p className="mt-1 font-serif text-lg text-espresso">{value}</p>
    </div>
  );
}
