import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, MapPin, ArrowUpRight, Instagram } from "lucide-react";
import { experiences } from "@/lib/experiences";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & poptávka — LU by Lucie" },
      { name: "description", content: "Poptejte květinový zážitek LU — svatby, rozlučky, firemní eventy. Odpovídám do 24 hodin." },
      { property: "og:title", content: "Kontakt — LU by Lucie" },
      { property: "og:description", content: "Poptejte květinový zážitek — svatby, rozlučky, firemní eventy." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background">
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-20 pb-24 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:pt-28">
        <aside className="lg:col-span-4">
          <p className="eyebrow">Napište mi</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl">
            Rozkveťme <em className="italic">váš okamžik</em>.
          </h1>
          <p className="mt-6 text-cocoa/80">
            Ať máte v hlavě konkrétní datum nebo jen nápad — napište mi. Odpovídám osobně, obvykle do 24 hodin, s návrhem palety a orientační kalkulací.
          </p>

          <div className="mt-12 space-y-6">
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="E-mail"
              value="hello@lubylucie.cz"
              href="mailto:hello@lubylucie.cz"
            />
            <ContactRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              value="+420 000 000 000"
              href="https://wa.me/420000000000"
            />
            <ContactRow
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              value="@lubylucie"
              href="https://instagram.com"
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
              href="https://wa.me/420000000000"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-espresso px-6 py-3 text-xs uppercase tracking-[0.22em] text-espresso hover:bg-espresso hover:text-cream"
            >
              Napsat rovnou na WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-[2px] border border-border bg-card p-8 sm:p-12"
          >
            <p className="eyebrow">Poptávkový formulář</p>
            <h2 className="mt-3 font-serif text-3xl text-espresso">Řekněte mi o vaší akci</h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Field label="Jméno *">
                <input required type="text" className="lu-input" placeholder="Vaše jméno" />
              </Field>
              <Field label="E-mail *">
                <input required type="email" className="lu-input" placeholder="jmeno@email.cz" />
              </Field>
              <Field label="Telefon">
                <input type="tel" className="lu-input" placeholder="+420" />
              </Field>
              <Field label="Datum akce">
                <input type="date" className="lu-input" />
              </Field>

              <Field label="Typ zážitku">
                <select className="lu-input" defaultValue="">
                  <option value="" disabled>Vyberte…</option>
                  {experiences.map((e) => (
                    <option key={e.slug} value={e.slug}>{e.title}</option>
                  ))}
                  <option value="jine">Ještě si nejsem jistá</option>
                </select>
              </Field>

              <Field label="Příležitost">
                <select className="lu-input" defaultValue="">
                  <option value="" disabled>Vyberte…</option>
                  <option>Svatba</option>
                  <option>Rozlučka se svobodou</option>
                  <option>Firemní event</option>
                  <option>Narozeniny / oslava</option>
                  <option>Baby shower / gender reveal</option>
                  <option>Jiné</option>
                </select>
              </Field>

              <Field label="Počet hostů">
                <select className="lu-input" defaultValue="">
                  <option value="" disabled>Vyberte…</option>
                  <option>Do 10</option>
                  <option>10–30</option>
                  <option>30–80</option>
                  <option>80–200</option>
                  <option>200+</option>
                </select>
              </Field>

              <Field label="Lokalita">
                <input type="text" className="lu-input" placeholder="Praha, Střední Čechy…" />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Řekněte mi víc">
                <textarea rows={5} className="lu-input resize-none" placeholder="Atmosféra, paleta, prostor, cokoliv, co vám leží na srdci…" />
              </Field>
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-cocoa/60">
                Odesláním souhlasíte se zpracováním údajů pro účely komunikace.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-full bg-espresso px-8 py-4 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
              >
                {sent ? "Odesláno ✓" : "Odeslat poptávku"}
                {!sent && <ArrowUpRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>
      </section>

      <style>{`
        .lu-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid color-mix(in oklab, var(--cocoa) 30%, transparent);
          padding: 0.85rem 0.25rem;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--espresso);
          transition: border-color 200ms ease;
        }
        .lu-input::placeholder { color: color-mix(in oklab, var(--cocoa) 50%, transparent); }
        .lu-input:focus { outline: none; border-bottom-color: var(--champagne); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-cocoa/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
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
