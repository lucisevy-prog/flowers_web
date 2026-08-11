import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { getGlobalStartContext } from "@tanstack/react-start";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // undefined on the client (getGlobalStartContext is a no-op there) and
  // during any server call outside a request's start context — router.tsx
  // is isomorphic, so this can't assume a request is always in flight.
  const cspNonce = (getGlobalStartContext() as { cspNonce?: string } | undefined)?.cspNonce;

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ssr: cspNonce ? { nonce: cspNonce } : undefined,
  });

  return router;
};
