import { Link } from "@tanstack/react-router";

// A paragraph is a plain string; a bullet list is a string array.
export type LegalBlock = string | string[];
export type LegalSection = { heading: string; blocks: LegalBlock[] };

export function LegalPage({
  title,
  effectiveDate,
  intro,
  sections,
}: {
  title: string;
  effectiveDate: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-28 lg:px-10 lg:pt-28">
        <p className="eyebrow">
          <Link to="/kontakt" className="hover:text-cocoa">
            ← Kontakt
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-cocoa/60">Účinné od: {effectiveDate}</p>
        {intro ? <p className="mt-8 text-base leading-relaxed text-cocoa/85">{intro}</p> : null}

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <div key={section.heading} className="border-t border-border pt-8">
              <h2 className="font-serif text-2xl text-espresso">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-cocoa/85">
                {section.blocks.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i} className="list-disc space-y-2 pl-5">
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{block}</p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
