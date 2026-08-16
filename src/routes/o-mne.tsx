import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type SubmitEvent } from "react";
import flowerBarAction from "@/assets/lucie-flower-bar-action.jpg";
import { ArrowUpRight } from "lucide-react";
import { submitInquiry } from "@/lib/contact.functions";

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

type SubmitStatus = "idle" | "pending" | "success" | "error";

function About() {
  const submitInquiryFn = useServerFn(submitInquiry);
  const [status, setStatus] = useState<SubmitStatus>("idle");

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
              Jmenuji se Lucie a <em className="italic">tvořím zážitky</em>, po kterých doma zůstane
              vůně.
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-cocoa/85">
              <p>
                Ke květinám jsem se dostala oklikou — přes marketing, styling a několik let
                strávených mezi butikovými značkami v Paříži. Zjistila jsem, že to, co mě baví
                nejvíc, není samotná kytice, ale okamžik, který kolem ní vzniká.
              </p>
              <p>
                LU jsem založila v roce 2022 v Praze jako značku, která květiny nedává na piedestal
                — dává je do rukou. Pracuji se ženami, páry a značkami, které chtějí, aby jejich
                moment zůstal v paměti jinak, než jen jako pěkná fotka.
              </p>
              <p className="font-serif text-xl text-espresso italic">
                „Nedělám floristiku. Dělám zážitky, ve kterých květiny jenom hrají hlavní roli."
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
              <a href="mailto:hello@lubylucie.cz" className="underline">
                hello@lubylucie.cz
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
    </div>
  );
}
