// Best-effort in-memory rate limiter, keyed by caller (IP address here).
// Like the access-token cache in google-sheets.ts, the Map survives between
// requests on a warm serverless instance but not across a cold start or
// between separate concurrent instances — a deliberate trade-off. It stops
// a single scripted client hammering the form from one origin without
// standing up an external store (Vercel KV/Upstash) for what is, today, a
// personal-business volume of traffic. Revisit with a shared store if
// traffic ever spreads meaningfully across concurrent instances.

type Window = { windowMs: number; max: number };

// Two tiers: a tight burst limit (catches a script firing requests back to
// back) and a looser hourly cap (catches slower, spread-out spam that stays
// under the burst limit).
const WINDOWS: Window[] = [
  { windowMs: 60_000, max: 5 },
  { windowMs: 60 * 60_000, max: 20 },
];
const MAX_WINDOW_MS = Math.max(...WINDOWS.map((w) => w.windowMs));

const requestLog = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < MAX_WINDOW_MS);

  const limited = WINDOWS.some(
    (w) => timestamps.filter((t) => now - t < w.windowMs).length >= w.max,
  );
  if (limited) {
    // Don't record this attempt as a used slot — a sustained flood would
    // otherwise grow the array without bound for as long as it keeps
    // trying. Still persist the pruned timestamps so the window slides.
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}
