import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Instagram, ArrowUpRight } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

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
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-md shadow-xs"
          : "bg-transparent"
      }`}
    >
      {/* Top Instagram Announcement Bar */}
      <div className="border-b border-champagne/25 bg-gradient-to-r from-cream via-blush/30 to-cream py-1.5 px-4 text-center text-[0.72rem] tracking-wider text-cocoa/90">
        <a
          href="https://instagram.com/lu.byluci"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 hover:text-espresso"
        >
          <Instagram className="h-3.5 w-3.5 text-champagne shrink-0 transition-transform group-hover:scale-110" />
          <span>
            Sledujte nás na Instagramu{" "}
            <strong className="font-semibold text-espresso">@lu.byluci</strong> pro reelska,
            atmosféru v pohybu & novinky
          </span>
          <ArrowUpRight className="h-3 w-3 text-champagne shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center"
        >
          <img
            src={logoFull}
            alt="LU by Lucie — Květinové zážitky"
            className="h-20 w-auto sm:h-24"
          />
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
