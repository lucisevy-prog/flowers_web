import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { generateNonce } from "./lib/csp";

// Generates one Content-Security-Policy nonce per request, stashed on the
// global start context. router.tsx reads it to stamp SSR-injected
// <script>/<style> tags; __root.tsx reads the same value to build the
// matching response header. Runs first so every other middleware — and the
// router itself — sees it.
const cspNonceMiddleware = createMiddleware().server(async ({ next }) => {
  return next({ context: { cspNonce: generateNonce() } });
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [cspNonceMiddleware, errorMiddleware],
}));
