// Per-request Content-Security-Policy nonce. Generated once per request by
// the cspNonceMiddleware in start.ts, read back in router.tsx (to stamp
// TanStack Start's SSR-injected <script>/<style> tags via `ssr.nonce`) and
// in __root.tsx (to build the matching response header) — same value both
// places because both reads happen inside the same request's
// AsyncLocalStorage-backed start context.

// 128 bits, the minimum CSP itself recommends for a nonce to be unguessable.
const NONCE_BYTES = 16;

export function generateNonce(): string {
  const bytes = new Uint8Array(NONCE_BYTES);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

export function buildContentSecurityPolicy(nonce: string): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}'`,
    // No nonce here on purpose: the app has zero inline style/style="" left
    // (see hero-glow/cta-glow/.lu-input in styles.css), so 'self' + the
    // Google Fonts host already cover every stylesheet. Adding the nonce
    // anyway triggers a real WebKit/Safari bug where 'self' stops being
    // honored for <link rel="stylesheet"> once a nonce is also present in
    // the directive, blocking every stylesheet outright.
    `style-src 'self' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self'`,
    `connect-src 'self'`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ];
  // `vite dev` serves plain HTTP on localhost. Safari/WebKit takes
  // `upgrade-insecure-requests` literally and rewrites every subresource
  // request (styles, images, the dev client) to https://localhost, which
  // has nothing listening — every request then fails outright and the page
  // renders with zero CSS. Chromium is more forgiving about this locally,
  // which is why this only showed up in Safari. Production is served over
  // real HTTPS, so the directive is only meaningful (and only safe) there.
  if (!import.meta.env.DEV) {
    directives.push("upgrade-insecure-requests");
  }
  return directives.join("; ");
}
