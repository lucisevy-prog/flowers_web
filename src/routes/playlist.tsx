import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Play, Pause, Sparkles, Heart, Flower2 } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";

// Hostovaný soubor — po nahrání finální nahrávky do public/audio/ stačí zde
// upravit název souboru, žádná další změna kódu není potřeba.
const AUDIO_SRC = "/audio/hvezdny-flower-bar.mp3";

export const Route = createFileRoute("/playlist")({
  head: () => ({
    meta: [
      { title: "Hudební podkres — Melodie 4 živlů | LU by Lucie" },
      {
        name: "description",
        content:
          "Hudební podkres pro chvíli ticha a psaní dopisu sobě sama. Propojte se s energií čtyř živlů.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PlaylistPage,
});

export function PlaylistPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      void audio.play();
    }
  };

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-[#faf6f2] flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Delicate background decorative gradient & elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blush/40 via-cream to-[#f7f0e8]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-champagne/20 blur-3xl" />

      <div className="mx-auto max-w-2xl">
        {/* Brand logo mark */}
        <div className="mb-8 flex justify-center">
          <img src={logoMark} alt="LU by Lucie" className="h-16 w-auto opacity-90" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-card/80 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-espresso shadow-xs backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-champagne" />
          <span>Hvězdný Flower Bar · Květinový rituál</span>
        </div>

        {/* Exact heading requested */}
        <h1 className="mt-8 font-serif text-3xl leading-snug text-espresso sm:text-4xl lg:text-5xl">
          Dámy, hudební podkres pro vaši <em className="italic text-cocoa">chvíli ticha</em>
        </h1>

        {/* Exact text requested */}
        <div className="mt-8 space-y-4 text-base leading-relaxed text-cocoa/90 sm:text-lg">
          <p className="font-serif italic text-lg sm:text-xl text-espresso">
            Pusťte si melodii živlů ve chvíli, kdy přecházíte k psaní dopisu sobě sama.
          </p>
          <p className="text-sm sm:text-base text-cocoa/80 max-w-xl mx-auto">
            Nechte se prostoupit jemnými tóny, které v sobě propojují energii čtyř živlů. Hudba
            zklidní mysl, otevře tvořivý prostor a doprovodí vás při formulování vašich přání a
            myšlenek do budoucna.
          </p>
        </div>

        {/* Interactive sound player button & visualizer */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5">
          <button
            type="button"
            onClick={toggleSound}
            className={`group relative inline-flex items-center gap-3.5 rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition-all duration-500 shadow-lg ${
              isPlaying
                ? "bg-cocoa ring-4 ring-champagne/40 shadow-champagne/30 scale-105"
                : "bg-espresso hover:bg-cocoa hover:scale-102"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 text-champagne fill-champagne animate-pulse" />
                <span>Pozastavit hudbu živlů</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 text-champagne fill-champagne" />
                <span>Spustit playlist</span>
              </>
            )}
          </button>

          {/* Sound waves animation when playing */}
          {isPlaying && (
            <div className="flex items-center gap-1.5 h-6 pt-2">
              <span className="w-1 bg-champagne h-3 rounded-full animate-bounce" />
              <span className="w-1 bg-champagne h-6 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 bg-champagne h-4 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="w-1 bg-champagne h-5 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-1 bg-champagne h-2 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          )}

          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Quote / mood footer */}
        <div className="mt-16 pt-8 border-t border-champagne/30 flex items-center justify-center gap-3 text-xs text-cocoa/60 italic font-serif text-sm">
          <Flower2 className="h-4 w-4 text-champagne/80" />
          <span>Vnímejte svůj dech, tvořte srdcem a užijte si tento okamžik.</span>
          <Heart className="h-4 w-4 text-rose/70" />
        </div>
      </div>
    </div>
  );
}
