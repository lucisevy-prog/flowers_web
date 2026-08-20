import { defineConfig, loadEnv, type UserConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Response headers applied to every route, both for Nitro-handled (SSR)
// responses and — via the `vercel.json` headers config Nitro derives from
// routeRules — for static assets Vercel serves directly from its edge
// network without invoking the function.
//
// Content-Security-Policy is deliberately NOT set here: it needs a
// per-request nonce (see src/lib/csp.ts + the root route's `headers()`) to
// cover TanStack Start's SSR-injected inline <script> tags, and computing
// that requires the request-scoped start context these static routeRules
// don't have. Setting a second, non-nonce CSP here risked the two headers
// disagreeing on which inline scripts are allowed — one header wins, and
// debugging which is not worth it for the one path (a catastrophic SSR
// crash rendering the static fallback in error-page.ts) that bypasses the
// router and its headers() entirely.
const securityRouteRules = {
  "/**": {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    },
  },
};

// TanStack Start's Vite pipeline, configured directly: Tailwind, tsconfig
// path aliases, TanStack Start pointed at src/server.ts, a Vercel build via
// Nitro, and React.
export default defineConfig(({ command, mode }) => {
  const isDevBuild = command === "build" && mode === "development";

  // Vite exposes import.meta.env.VITE_* to client code automatically, but
  // Nitro's SSR bundling for the Vercel build doesn't run those references
  // through Vite's own transform, so they're inlined explicitly here too.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine = Object.fromEntries(
    Object.entries(env).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  const config: UserConfig = {
    define: envDefine,
    // Tailwind v4 runs its build-time CSS through Lightning CSS; matching
    // that in dev avoids build-only transforms (e.g. collapsing a
    // hand-written `-webkit-backdrop-filter`) diverging between `vite dev`
    // and `vite build`.
    css: { transformer: "lightningcss" },
    resolve: {
      // Vite 8 resolves the tsconfig `paths` map (our "@/*" alias) natively;
      // the explicit alias below stays as a belt-and-suspenders fallback.
      tsconfigPaths: true,
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    // Pre-bundle the always-present client deps so dep re-optimization
    // doesn't rotate the optimized-dep hash and 504 tabs holding the old one.
    // React core only — including @tanstack/react-start would pull its
    // node:async_hooks server entry into the client bundle and crash hydration.
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // Redirect TanStack Start's bundled server entry to src/server.ts
        // (our SSR error wrapper) — Nitro/Vite build from this.
        server: { entry: "server" },
      }),
      // Vercel build only — dev/preview don't need Nitro, and importing it
      // needlessly slows dev server startup. Requires nitro >=3.0.260603-beta
      // for the `defaultPreset` option used below.
      ...(command === "build"
        ? [nitro({ defaultPreset: "vercel", routeRules: securityRouteRules })]
        : []),
      viteReact(),
    ],
  };

  if (isDevBuild) {
    // `npm run build:dev` builds with mode=development but command=build.
    // Vite's default NODE_ENV flip for that combination emits jsxDEV calls
    // the react-server SSR runtime can't resolve, so it's scoped to the
    // client environment only.
    config.environments = {
      client: { define: { "process.env.NODE_ENV": JSON.stringify("development") } },
    };
  }

  return config;
});
