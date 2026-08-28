import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type SubmitEvent } from "react";
import flowerBarAction from "@/assets/lucie-flower-bar-action.jpg";
import intimniRitualImg from "@/assets/o-mne-intimni-ritual.png";
import velkolepyBarImg from "@/assets/o-mne-velkolepy-bar.png";
import miniKoloStesti from "@/assets/mini-kolo_stesti.png";
import { ArrowUpRight } from "lucide-react";
import { submitInquiry } from "@/lib/contact.functions";
import { SuccessModal } from "@/components/success-modal";

export const Route = createFileRoute("/o-mne")({
  head: () => ({
    meta: [
      { title: "O mně — Lucie — LU by Lucie" },
      {
        name: "description",
        content:
          "Za značkou LU stojí Lucie — florální designérka a stylistka, která věří v pomalé, smyslové zážitky.",
      },
      { property: "og:title", content: "O mně — LU by Lucie" },
      {
        property: "og:description",
        content: "Za značkou LU stojí Lucie — florální designérka a stylistka.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.lubyluci.cz/o-mne" }],
  }),
  component: About,
});

const formats = [
  {
    title: "Intimní rituál",
    text: "Dokážu vytvořit hluboký, intimní rituál pro menší skupiny (6 až 20 žen) na rozlučkách se svobodou, narozeninách nebo gender reveal.",
    image: intimniRitualImg,
  },
  {
    title: "Velkolepý flower bar",
    text: "Zároveň umím postavit velkolepý flower bar, který se stane hlavním zážitkovým bodem na větších firemních eventech pro desítky až stovku hostů.",
    image: velkolepyBarImg,
  },
];

const principles = [
  {
    title: "Prémiové květiny vždy",
    text: "Nekompromisní kvalita při každém zážitku, bez výjimky. Pracuji jen s těmi nejkrásnějšími a nejčerstvějšími stonky.",
  },
  {
    title: "Odnesete si kus krásy domů",
    text: "Naše koncepty jsou navržené tak, aby zážitek bavil, někdy dojal a stal se třešinkou každé události.",
  },
  {
    title: "Dokonalost v detailech",
    text: "Od vizuálního zpracování barů až po doprovodné rituály – vše má svůj jasný estetický řád.",
  },
];

type SubmitStatus = "idle" | "pending" | "success" | "error";

function About() {
  const submitInquiryFn = useServerFn(submitInquiry);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const field = (name: string) => String(formData.get(name) ?? "");

    setStatus("pending");
    try {
      const result = await submitInquiryFn({
        data: {
          name: field("name"),
          email: field("email"),
          message: field("message"),
          company: field("company"),
        },
      });
      if (result.ok) {
        setStatus("success");
        setShowSuccessModal(true);
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <img src={flowerBarAction} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="ml-auto max-w-md rounded-[2px] border border-champagne/40 bg-cream p-8 shadow-[0_20px_50px_-20px_rgba(94,70,59,0.45)] sm:p-10">
            <p className="eyebrow">Za značkou LU</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-espresso sm:text-5xl">
              Ahoj, jsem <em className="italic">Luci</em>.
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-cocoa/85">
              <p>
                Ke květinám jsem se dostala před pár lety, když jsem dostala úplně volnou ruku k
                přípravě květinové výzdoby pro dvě velké akce. Tehdy jsem pochopila, jak silnou
                atmosféru a emoce dokážou květiny vytvořit, zvlášť když se k nim přistoupí ještě
                jinak.
              </p>
              <p>
                Nemám květinářství a nepořádám tradiční workshopy na vázání kytic nebo výrobu věnců.
                Jsem ale velká požitkářka milující vše krásné a milé — mám ráda, když je lidem kolem
                mě dobře, a jsem fanynkou neotřelých a originálních věcí a zážitků. Proto jsem
                založila značku LU, abych mohla přispět svou troškou do mlýna 🙂
              </p>
              <p className="font-serif text-xl text-espresso italic">
                „Připravila jsem Květinové zážitky — vše pro vás a takové, jaké u nás běžně
                neuvidíte."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow">Od intimní oslavy po větší firemní event</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            Mám ráda rozmanitost a dynamiku.
          </h2>
          <p className="mt-5 text-cocoa/80">
            Moje zážitky jsou navržené tak, aby se přizpůsobily jakémukoli formátu akce:
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {formats.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center rounded-[2px] border border-champagne/40 bg-cream p-8 text-center shadow-[0_20px_50px_-30px_rgba(94,70,59,0.35)]"
            >
              <img src={f.image} alt="" className="h-44 w-44 object-contain sm:h-52 sm:w-52" />
              <h3 className="mt-4 font-serif text-2xl text-espresso">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/80">{f.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-cocoa/80">
          Každý z našich pěti konceptů má svá specifika. Doporučuji si rozkliknout detaily
          jednotlivých zážitků v sekci{" "}
          <Link to="/zazitky" className="underline decoration-champagne underline-offset-4">
            Zážitky
          </Link>
          , kde najdete podrobný popis, pro koho se hodí a co přesně zahrnují.
        </p>
      </section>

      <section className="bg-cocoa text-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-xl">
            <p className="eyebrow !text-champagne">Na čem si zakládám</p>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
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

      <section className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-10">
        <img
          src={miniKoloStesti}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-6 -left-4 hidden w-24 -rotate-6 opacity-90 sm:block lg:top-2 lg:-left-16 lg:w-32"
        />
        <p className="eyebrow">Nejste si jistí?</p>
        <h2 className="mt-4 font-serif text-4xl text-espresso sm:text-5xl">
          Který z pěti květinových zážitků bude ten váš?
        </h2>
        <p className="mt-6 text-cocoa/80">
          Nejste si jistí, který formát je pro vaši akci ten pravý, nebo máte specifické přání?
          Právě od toho jsem tu já. Vyplňte krátký formulář, napište mi svou představu a já vám
          doporučím řešení, které bude na vaší akci fungovat nejlépe.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 grid max-w-xl gap-4 text-left">
          {/* Honeypot — hidden from sighted users and screen readers alike;
              real visitors never fill it, so a non-empty value marks a bot. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="about-company">Nevyplňujte toto pole</label>
            <input id="about-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <input
            required
            name="name"
            type="text"
            placeholder="Vaše jméno"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <input
            required
            name="email"
            type="email"
            placeholder="E-mail"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="O co jde? (pár slov stačí)"
            className="w-full border-0 border-b border-cocoa/30 bg-transparent px-1 py-4 text-base text-espresso placeholder:text-cocoa/50 focus:border-champagne focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "pending"}
            className="mt-6 inline-flex items-center justify-center gap-3 self-start rounded-full bg-espresso px-8 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "success"
              ? "Odesláno ✓"
              : status === "pending"
                ? "Odesílám…"
                : "Odeslat zprávu"}
            {status === "idle" && <ArrowUpRight className="h-4 w-4" />}
          </button>
          {status === "error" ? (
            <p className="text-sm text-red-600">
              Něco se pokazilo. Zkuste to prosím znovu, nebo mi napište přímo na{" "}
              <a href="mailto:lubyluci.studio@gmail.com" className="underline">
                lubyluci.studio@gmail.com
              </a>
              .
            </p>
          ) : null}
        </form>

        <p className="mt-8 text-sm text-cocoa/60">
          Preferujete delší formulář?{" "}
          <Link to="/kontakt" className="underline decoration-champagne underline-offset-4">
            Přejít na kontakt
          </Link>
        </p>
      </section>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Zpráva odeslána!"
      >
        <p>Děkujeme, ozvu se vám do 24 hodin.</p>
      </SuccessModal>
    </div>
  );
}
