import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, MapPin } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-6 pt-14 lg:px-10">
        <p className="text-center font-serif text-4xl uppercase tracking-[0.12em] text-champagne sm:text-5xl lg:text-left lg:text-6xl">
          Live Uniquely
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 pt-10 pb-20 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-block"
          >
            <img src={logoFull} alt="LU by Lucie — Květinové zážitky" className="h-32 w-auto" />
          </Link>
          <p className="mt-6 max-w-md font-serif text-2xl leading-snug text-cream/90">
            Květinové zážitky, které si odnesete domů — v kytici i ve vzpomínce.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-cream/70">
            <a
              href="mailto:lubyluci.studio@gmail.com"
              className="inline-flex items-center gap-2 hover:text-champagne"
            >
              <Mail className="h-4 w-4" /> lubyluci.studio@gmail.com
            </a>
            <a
              href="https://wa.me/420777992589"
              className="inline-flex items-center gap-2 hover:text-champagne"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="https://instagram.com/lu.byluci"
              className="inline-flex items-center gap-2 hover:text-champagne"
            >
              <Instagram className="h-4 w-4" /> @lu.byluci
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow !text-champagne">Navigace</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/80">
            <li>
              <Link to="/" className="hover:text-champagne">
                Domů
              </Link>
            </li>
            <li>
              <Link to="/zazitky" className="hover:text-champagne">
                Zážitky
              </Link>
            </li>
            <li>
              <Link to="/o-mne" className="hover:text-champagne">
                O mně
              </Link>
            </li>
            <li>
              <Link to="/kontakt" className="hover:text-champagne">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-champagne">Kde působíme</p>
          <p className="mt-5 inline-flex items-start gap-2 text-sm text-cream/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Praha & Středočeský kraj
              <br />
              Na vyžádání kdekoliv v ČR
            </span>
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-6 text-xs text-cream/50 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} LU by Lucie. Vytvořeno s láskou.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/obchodni-podminky" className="hover:text-champagne">
              Obchodní podmínky
            </Link>
            <Link to="/zasady-ochrany-osobnich-udaju" className="hover:text-champagne">
              Zásady ochrany osobních údajů
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
