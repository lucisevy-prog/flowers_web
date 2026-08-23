import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

// Lightweight modal, no external dependency — just this project's design
// tokens. Closes on Escape, backdrop click, or the × button.
export function SuccessModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/60 px-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-[2px] border border-champagne/40 bg-cream p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít"
          className="absolute top-4 right-4 text-cocoa/50 hover:text-espresso"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="eyebrow">Poptávka odeslána</p>
        <h2 id="success-modal-title" className="mt-3 font-serif text-3xl text-espresso">
          {title}
        </h2>
        <div className="mt-4 text-sm leading-relaxed text-cocoa/80">{children}</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-espresso px-6 py-3 text-xs uppercase tracking-[0.22em] text-cream hover:bg-cocoa"
        >
          Zavřít
        </button>
      </div>
    </div>
  );
}
