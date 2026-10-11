import { Link } from "@tanstack/react-router";
import { getExperience } from "@/lib/experiences";
import type { Review } from "@/lib/reviews";

// Jedna recenze jako editoriální karta. Varianty:
// - "default": běžná karta v mřížce na /recenze,
// - "lead": úvodní karta přes celou šířku (větší písmo i fotka),
// - "compact": ukázka na homepage — použije `excerpt` (je-li), ať zůstane
//   krátká. Záměrně bez line-clamp: useknutá věta uprostřed citace působí
//   lacině, délku hlídají výňatky v reviews.ts.
export type ReviewCardVariant = "default" | "lead" | "compact";

export function ReviewCard({
  review,
  variant = "default",
}: {
  review: Review;
  variant?: ReviewCardVariant;
}) {
  const experience = review.experienceSlug ? getExperience(review.experienceSlug) : undefined;
  const isLead = variant === "lead";
  const text = variant === "compact" ? (review.excerpt ?? review.text) : review.text;

  return (
    <figure
      className={`flex h-full flex-col rounded-[2px] border border-champagne/30 bg-card shadow-[0_20px_50px_-30px_rgba(94,70,59,0.35)] ${
        isLead ? "p-7 sm:p-10 lg:px-16 lg:py-14" : "p-7 sm:p-9"
      }`}
    >
      <span
        aria-hidden="true"
        className={`block font-serif leading-none text-champagne ${
          isLead ? "h-10 text-7xl sm:h-12 sm:text-8xl" : "h-7 text-5xl sm:h-8 sm:text-6xl"
        }`}
      >
        “
      </span>
      <blockquote
        className={`mt-3 font-serif leading-relaxed text-espresso ${
          isLead
            ? "max-w-4xl text-xl sm:text-2xl lg:text-[1.7rem] lg:leading-[1.6]"
            : "text-lg sm:text-xl"
        }`}
      >
        {text}
      </blockquote>

      <figcaption className={`mt-auto ${isLead ? "pt-8 sm:pt-10" : "pt-7"}`}>
        {/* min-h = výška miniatury + pt-5 + linka, ať oddělovač sedí ve všech
            kartách řady na stejné výšce s fotkou i bez ní. */}
        <div
          className={`flex items-center gap-4 border-t border-border pt-5 ${
            isLead
              ? "min-h-[calc(5.25rem+1px)] sm:min-h-[calc(6.25rem+1px)]"
              : "min-h-[calc(4.75rem+1px)]"
          }`}
        >
          {review.photo ? (
            <img
              src={review.photo}
              alt=""
              loading="lazy"
              width={isLead ? 80 : 56}
              height={isLead ? 80 : 56}
              className={`shrink-0 rounded-full border border-champagne/40 object-cover ${
                isLead ? "h-16 w-16 sm:h-20 sm:w-20" : "h-14 w-14"
              }`}
            />
          ) : null}
          <div>
            <p className={`font-medium text-espresso ${isLead ? "text-base" : "text-sm"}`}>
              {review.name}
            </p>
            <p className="mt-1 text-xs tracking-[0.12em] text-cocoa/80 uppercase">
              {review.role}
              {experience ? (
                <>
                  {" · "}
                  <Link
                    to="/zazitky/$slug"
                    params={{ slug: experience.slug }}
                    className="underline decoration-champagne underline-offset-4 hover:text-espresso"
                  >
                    {experience.title}
                  </Link>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
