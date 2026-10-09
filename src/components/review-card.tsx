import { Link } from "@tanstack/react-router";
import { getExperience } from "@/lib/experiences";
import type { Review } from "@/lib/reviews";

// Jedna recenze jako editoriální karta. `compact` = varianta pro homepage:
// použije `excerpt` (je-li), ať ukázka zůstane krátká. Záměrně bez
// line-clamp — useknutá věta uprostřed citace působí lacině; délku hlídají
// výňatky v reviews.ts.
export function ReviewCard({ review, compact = false }: { review: Review; compact?: boolean }) {
  const experience = review.experienceSlug ? getExperience(review.experienceSlug) : undefined;
  const text = compact ? (review.excerpt ?? review.text) : review.text;

  return (
    <figure className="flex h-full break-inside-avoid flex-col rounded-[2px] border border-champagne/30 bg-card p-8 shadow-[0_20px_50px_-30px_rgba(94,70,59,0.35)] sm:p-9">
      <span
        aria-hidden="true"
        className="block h-8 font-serif text-6xl leading-none text-champagne"
      >
        “
      </span>
      <blockquote className="mt-3 font-serif text-xl leading-relaxed text-espresso">
        {text}
      </blockquote>

      <figcaption className="mt-auto pt-7">
        <div className="flex items-center gap-4 border-t border-border pt-5">
          {review.photo ? (
            <img
              src={review.photo}
              alt=""
              loading="lazy"
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full border border-champagne/40 object-cover"
            />
          ) : null}
          <div>
            <p className="text-sm font-medium text-espresso">{review.name}</p>
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
