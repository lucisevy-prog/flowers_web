import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type SubmitEvent } from "react";
import { Mail, MessageCircle, MapPin, ArrowUpRight, Instagram } from "lucide-react";
import { experiences } from "@/lib/experiences";
import { submitInquiry } from "@/lib/contact.functions";
import moodboardCollage from "@/assets/moodboard-collage.png";

type ContactSearch = { zazitek?: string };

export const Route = createFileRoute("/kontakt")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    zazitek: typeof search.zazitek === "string" ? search.zazitek : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kontakt & poptávka — LU by Lucie" },
      {
        name: "description",
        content:
          "Poptejte květinový zážitek LU — svatby, rozlučky, firemní eventy. Odpovídám do 24 hodin.",
      },
      { property: "og:title", content: "Kontakt — LU by Lucie" },
      {
        property: "og:description",
        content: "Poptejte květinový zážitek — svatby, rozlučky, firemní eventy.",
      },
    ],
  }),
  component: Contact,
});

type SubmitStatus = "idle" | "pending" | "success" | "error";

function Contact() {
  const submitInquiryFn = useServerFn(submitInquiry);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const { zazitek } = Route.useSearch();
  const preselectedExperience = experiences.find((e) => e.slug === zazitek)?.title ?? "";

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
          phone: field("phone"),
          eventDate: field("eventDate"),
          experience: field("experience"),
          occasion: field("occasion"),
          guestCount: field("guestCount"),
          location: field("location"),
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
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-y-16 gap-x-14 px-6 pt-20 pb-24 lg:grid-cols-12 lg:px-10 lg:pt-28">
        {/* Row 1 on desktop: Pricing & Steps Section (occupies full 12 columns) */}
        <div className="lg:col-span-12 lg:row-start-1">
          <div className="grid gap-16 border-b border-border pb-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Jak to funguje s cenou?</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
                Transparentně. <br className="hidden sm:block" />
                <em className="italic">Bez skrytých poplatků.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-cocoa/80">
                U každého květinového zážitku vidíte jasnou základní cenu, která platí pro stanovený
                počet osob. Pokud je vás na rozlučce nebo oslavě víc, žádný problém. Za každého
                dalšího hosta se připočítává pevný příplatek, takže si konečnou cenu snadno
                spočítáte sami předem. Žádné skryté poplatky, vše je transparentní.
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow">Rezervace ve 3 jednoduchých krocích</p>
              <h3 className="mt-4 font-serif text-3xl text-espresso">Co se stane po odeslání</h3>

              <ol className="mt-10 space-y-8">
                {[
                  {
                    n: "01",
                    title: "Vyberete si termín a vyplníte formulář",
                    text: "Zabere to minutku. Napíšete mi, o jaký zážitek máte zájem.",
                  },
                  {
                    n: "02",
                    title: "Potvrzení a podklady k platbě",
                    text: "Do 24 hodin vám e-mailem potvrdím termín, pošlu konečnou kalkulaci a QR kód pro rychlou platbu. Od odeslání podkladů vám termín závazně držím 24 hodin.",
                  },
                  {
                    n: "03",
                    title: "Máte rezervováno",
                    text: "Jakmile platba dorazí, termín a zážitek je definitivně váš. Do e-mailu vám přijde faktura a vy se můžete začít těšit na zážitek. Bez stresu a zbytečného papírování.",
                  },
                ].map((s) => (
                  <li
                    key={s.n}
                    className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6"
                  >
                    <span className="font-serif text-3xl text-champagne">{s.n}</span>
                    <div>
                      <h4 className="font-serif text-xl text-espresso">{s.title}</h4>
                      <p className="mt-2 text-cocoa/80 leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Row 2 on desktop: Sidebar on the left (starts at form level) */}
        <aside className="lg:col-span-4 lg:row-start-2">
          <p className="eyebrow">Napište mi</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            Rozkveťme <em className="italic">váš okamžik</em>.
          </h1>
          <p className="mt-6 text-cocoa/80">
            Ať máte v hlavě konkrétní datum nebo jen nápad — napište mi. Odpovídám osobně, obvykle
            do 24 hodin, s návrhem palety a orientační kalkulací.
          </p>

          <div className="mt-12 space-y-6">
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="E-mail"
              value="lubyluci.studio@gmail.com"
              href="mailto:lubyluci.studio@gmail.com"
            />
            <ContactRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              value="+420 777 992 589"
              href="https://wa.me/420777992589"
            />
            <ContactRow
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              value="@lu.byluci"
              href="https://instagram.com/lu.byluci"
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Kde působíme"
              value="Praha & Střední Čechy"
            />
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <p className="eyebrow">Rychlá volba</p>
            <a
              href="https://wa.me/420777992589"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-espresso px-6 py-3 text-xs uppercase tracking-[0.22em] text-espresso hover:bg-espresso hover:text-cream"
            >
              Napsat rovnou na WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <img
            src={moodboardCollage}
            alt="Nálada LU by Lucie — Flower Bar, Kniha zážitku, Flower Fortune a další"
            className="mx-auto mt-14 h-auto w-full max-w-xs"
            loading="lazy"
          />
        </aside>

        <div className="lg:col-span-8 lg:col-start-5 lg:row-start-2">
          <div className="mb-8 border-l-2 border-champagne/60 pl-4 py-1">
            <p className="font-serif text-xl sm:text-2xl leading-snug text-espresso italic">
              „Váš stůl, vaše společnost a květinový rituál připravený do posledního detailu. Stačí si
              vybrat svůj termín.“
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-[2px] border border-border bg-card p-8 sm:p-12"
          >
            <p className="eyebrow">Poptávkový formulář</p>
            <h2 className="mt-3 font-serif text-3xl text-espresso">Řekněte mi o vaší akci</h2>

            {/* Honeypot — hidden from sighted users and screen readers alike;
                real visitors never fill it, so a non-empty value marks a bot. */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="company">Nevyplňujte toto pole</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Field label="Jméno *">
                <input
                  required
                  name="name"
                  type="text"
                  className="lu-input"
                  placeholder="Vaše jméno"
                />
              </Field>
              <Field label="E-mail *">
                <input
                  required
                  name="email"
                  type="email"
                  className="lu-input"
                  placeholder="jmeno@email.cz"
                />
              </Field>
              <Field label="Telefon">
                <input name="phone" type="tel" className="lu-input" placeholder="+420" />
              </Field>
              <Field label="Datum akce">
                <input name="eventDate" type="date" className="lu-input" />
              </Field>

              <Field label="Typ zážitku">
                <select name="experience" className="lu-input" defaultValue={preselectedExperience}>
                  <option value="" disabled>
                    Vyberte…
                  </option>
                  {experiences.map((e) => (
                    <option key={e.slug} value={e.title}>
                      {e.title}
                    </option>
                  ))}
                  <option value="jine">Ještě si nejsem jistá</option>
                </select>
              </Field>

              <Field label="Typ akce">
                <select name="occasion" className="lu-input" defaultValue="">
                  <option value="" disabled>
                    Vyberte…
                  </option>
                  <option>Svatba</option>
                  <option>Rozlučka se svobodou</option>
                  <option>Baby shower</option>
                  <option>Narozeniny</option>
                  <option>Firemní event</option>
                  <option>Opening</option>
                  <option>Jiná příležitost</option>
                </select>
              </Field>

              <Field label="Předpokládaný počet hostů">
                <select name="guestCount" className="lu-input" defaultValue="">
                  <option value="" disabled>
                    Vyberte…
                  </option>
                  <option>Do 10 hostů</option>
                  <option>10–20 hostů</option>
                  <option>20–50 hostů</option>
                  <option>50 a více</option>
                </select>
              </Field>

              <Field label="Lokalita">
                <input
                  name="location"
                  type="text"
                  className="lu-input"
                  placeholder="Praha, Střední Čechy…"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Řekněte mi víc">
                <textarea
                  name="message"
                  rows={5}
                  className="lu-input resize-none"
                  placeholder="Atmosféra, paleta, prostor, cokoliv, co vám leží na srdci…"
                />
              </Field>
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-cocoa/60">
                Odesláním formuláře berete na vědomí zpracování osobních údajů za účelem vyřízení
                vaší poptávky v souladu se{" "}
                <Link to="/zasady-ochrany-osobnich-udaju" className="underline">
                  Zásadami ochrany osobních údajů
                </Link>
                .
              </p>
              <button
                type="submit"
                disabled={status === "pending" || status === "success"}
                className="inline-flex items-center gap-3 rounded-full bg-espresso px-8 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "success"
                  ? "Odesláno ✓"
                  : status === "pending"
                    ? "Odesílám…"
                    : "Odeslat poptávku"}
                {status === "idle" && <ArrowUpRight className="h-4 w-4" />}
              </button>
            </div>

            {status === "success" ? (
              <p className="mt-4 text-sm text-cocoa/80">
                <strong className="text-espresso">Děkujeme za vaši poptávku!</strong> Všechno v
                pořádku dorazilo. Do e-mailu jsme vám poslali shrnutí a do 24 hodin se vám ozveme s
                potvrzením dostupnosti vašeho termínu.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="mt-4 text-sm text-red-600">
                Něco se pokazilo a poptávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi
                napište přímo na{" "}
                <a href="mailto:lubyluci.studio@gmail.com" className="underline">
                  lubyluci.studio@gmail.com
                </a>
                .
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-cocoa/70">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne/50 text-champagne">
        {icon}
      </div>
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-cocoa/60">{label}</p>
        <p className="mt-0.5 font-serif text-lg text-espresso">{value}</p>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 group">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4">{inner}</div>
  );
}
