/**
 * Opt-in client logs for API debugging in any environment.
 * Set NEXT_PUBLIC_DEBUG_API=1 in .env.local or Vercel env, then redeploy.
 */
export function apiDebug(label: string, detail?: unknown): void {
  if (process.env.NEXT_PUBLIC_DEBUG_API !== '1') return;
  if (detail !== undefined) {
    console.info(`[api] ${label}`, detail);
  } else {
    console.info(`[api] ${label}`);
  }
}
