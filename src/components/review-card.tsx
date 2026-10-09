import { Link } from "@tanstack/react-router";
import { getExperience } from "@/lib/experiences";
import type { Review } from "@/lib/reviews";

// Jedna recenze jako editoriální karta. `compact` = varianta pro homepage:
// bez fotky a s oříznutým textem, ať ukázka zůstane krátká.
export function ReviewCard({ review, compact = false }: { review: Review; compact?: boolean }) {
  const experience = review.experienceSlug ? getExperience(review.experienceSlug) : undefined;
  const showImage = !compact && review.image;

  return (
    <figure className="flex h-full break-inside-avoid flex-col overflow-hidden rounded-[2px] border border-champagne/30 bg-card shadow-[0_20px_50px_-30px_rgba(94,70,59,0.35)]">
      {showImage ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={review.image}
            alt={review.imageAlt ?? ""}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-8 sm:p-9">
        <span
          aria-hidden="true"
          className="block h-8 font-serif text-6xl leading-none text-champagne"
        >
          “
        </span>
        <blockquote
          className={`mt-3 font-serif text-xl leading-relaxed text-espresso ${compact ? "line-clamp-6" : ""}`}
        >
          {review.text}
        </blockquote>

        <figcaption className="mt-auto pt-7">
          <div className="border-t border-border pt-5">
            <p className="text-sm font-medium text-espresso">{review.name}</p>
            <p className="mt-1 text-xs tracking-[0.12em] text-cocoa/80 uppercase">
              {review.occasion}
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
        </figcaption>
      </div>
    </figure>
  );
}
