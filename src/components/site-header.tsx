import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Domů" },
  { to: "/zazitky", label: "Zážitky" },
  { to: "/o-mne", label: "O mně" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled ? "border-b border-border/60 bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-3xl leading-none tracking-tight text-espresso">LU</span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.32em] text-cocoa/70 sm:inline">
            by Lucie
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative text-sm tracking-wide text-cocoa transition-colors hover:text-espresso"
              activeProps={{ className: "text-espresso" }}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-champagne transition-all duration-300 ${
                      isActive ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </>
              )}
            </Link>
          ))}
        </nav>

        <Link
          to="/kontakt"
          className="hidden rounded-full border border-espresso/80 bg-transparent px-5 py-2.5 text-xs tracking-[0.18em] text-espresso uppercase transition-all hover:bg-espresso hover:text-cream md:inline-block"
        >
          Poptat zážitek
        </Link>

        <button
          type="button"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-cocoa"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base text-cocoa hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-espresso px-5 py-3 text-center text-xs uppercase tracking-[0.18em] text-cream"
            >
              Poptat zážitek
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
