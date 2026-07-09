import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/lucie-portrait.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/o-mne")({
  head: () => ({
    meta: [
      { title: "O mně — Lucie — LU by Lucie" },
      { name: "description", content: "Za značkou LU stojí Lucie — florální designérka a stylistka, která věří v pomalé, smyslové zážitky." },
      { property: "og:title", content: "O mně — LU by Lucie" },
      { property: "og:description", content: "Za značkou LU stojí Lucie — florální designérka a stylistka." },
    ],
  }),
  component: About,
});

const pillars = [
  {
    title: "Detail",
    text: "Věřím v hedvábné stuhy, ručně psané kartičky a květiny vybírané kus po kuse. Detail dělá zážitek.",
  },
  {
    title: "Vůně & smysly",
    text: "Každý zážitek má svou vůni. Pracuji jen se sezónními, aromatickými odrůdami — nikdy s dovezenou 'plastovou' krásou.",
  },
  {
    title: "Intimita",
    text: "Ať je hostů šest nebo tři sta, cíl je stejný: aby každý z nich cítil, že tento moment vznikl pro něj.",
  },
  {
    title: "Řemeslo",
    text: "Vzdělávám se u florálních ateliérů v Paříži, Kodani a Amsterdamu. Tradice a inovace v každém aranžmá.",
  },
];

function About() {
  return (
    <div className="bg-background">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-20 pb-24 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-28">
        <div className="lg:col-span-7 lg:pt-10">
          <p className="eyebrow">Za značkou LU</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            Jmenuji se Lucie a <em className="italic">tvořím zážitky</em>, po kterých doma zůstane vůně.
          </h1>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-cocoa/85">
            <p>
              Ke květinám jsem se dostala oklikou — přes marketing, styling a
              několik let strávených mezi butikovými značkami v Paříži. Zjistila
              jsem, že to, co mě baví nejvíc, není samotná kytice, ale okamžik,
              který kolem ní vzniká.
            </p>
            <p>
              LU jsem založila v roce 2022 v Praze jako značku, která květiny
              nedává na piedestal — dává je do rukou. Pracuji se ženami, páry a
              značkami, které chtějí, aby jejich moment zůstal v paměti jinak,
              než jen jako pěkná fotka.
            </p>
            <p className="font-serif text-2xl text-espresso italic">
              „Nedělám floristiku. Dělám zážitky, ve kterých květiny jenom hrají hlavní roli."
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2px]">
              <img src={portrait} alt="Portrét Lucie" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 w-52 bg-blush p-5 sm:-right-8">
              <p className="font-serif text-xl leading-tight text-espresso italic">
                Lucie K.
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-cocoa/70">
                Florální designérka
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cocoa text-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-xl">
            <p className="eyebrow !text-champagne">Hodnotové pilíře</p>
            <h2 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">
              Čtyři principy, které vedou <em className="italic">každou akci</em>.
            </h2>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title} className="border-t border-cream/20 pt-6">
                <p className="font-serif text-4xl text-champagne">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-serif text-2xl text-cream">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 text-center lg:px-10">
        <p className="eyebrow">Krátká zpráva</p>
        <h2 className="mt-4 font-serif text-4xl text-espresso sm:text-5xl">
          Máte v hlavě moment, který si zaslouží květiny?
        </h2>
        <p className="mt-6 text-cocoa/80">
          Napište mi pár slov — datum, prostor, počet hostů. Ozvu se do 24 hodin.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-12 grid max-w-xl gap-4 text-left"
        >
          <input
            type="text"
            placeholder="Vaše jméno"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <textarea
            rows={4}
            placeholder="O co jde? (pár slov stačí)"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <button
            type="submit"
            className="mt-6 inline-flex items-center justify-center gap-3 self-start rounded-full bg-espresso px-8 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
          >
            Odeslat zprávu <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-8 text-sm text-cocoa/60">
          Preferujete delší formulář?{" "}
          <Link to="/kontakt" className="underline decoration-champagne underline-offset-4">
            Přejít na kontakt
          </Link>
        </p>
      </section>
    </div>
  );
}
