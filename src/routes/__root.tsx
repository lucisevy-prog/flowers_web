import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { getGlobalStartContext } from "@tanstack/react-start";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { buildContentSecurityPolicy } from "../lib/csp";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Stránka nenalezena</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Stránka se nepodařilo načíst
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Něco se pokazilo na naší straně. Zkuste to prosím znovu, nebo se vraťte na hlavní stránku.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Zkusit znovu
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  headers: () => {
    const nonce = (getGlobalStartContext() as { cspNonce?: string } | undefined)?.cspNonce;
    if (!nonce) return undefined;
    return { "Content-Security-Policy": buildContentSecurityPolicy(nonce) };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LU by Lucie — Květinové zážitky pro nezapomenutelné okamžiky" },
      {
        name: "description",
        content:
          "Prémiové květinové zážitky pro svatby, rozlučky se svobodou a firemní eventy v Praze a Středočeském kraji. Premium Flower Bar, DIY kity a intimní zážitky.",
      },
      { name: "author", content: "LU by Lucie" },
      {
        property: "og:title",
        content: "LU by Lucie — Květinové zážitky pro nezapomenutelné okamžiky",
      },
      {
        property: "og:description",
        content:
          "Prémiové květinové zážitky pro svatby, rozlučky se svobodou a firemní eventy v Praze a Středočeském kraji. Premium Flower Bar, DIY kity a intimní zážitky.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "LU by Lucie — Květinové zážitky pro nezapomenutelné okamžiky",
      },
      {
        name: "twitter:description",
        content:
          "Prémiové květinové zážitky pro svatby, rozlučky se svobodou a firemní eventy v Praze a Středočeském kraji. Premium Flower Bar, DIY kity a intimní zážitky.",
      },
      { property: "og:image", content: "https://www.lubyluci.cz/og-image.jpg" },
      { name: "twitter:image", content: "https://www.lubyluci.cz/og-image.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Karla:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
