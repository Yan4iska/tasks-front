/**
 * Base URL for axios (origin + Nest global prefix `/api`).
 * Set in `.env.local` as `NEXT_PUBLIC_API_URL` (required prefix so Next.js inlines it for the browser).
 * On Vercel: add the same variable in Project → Settings → Environment Variables before build.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/+$/, '') || 'http://localhost:4200/api';
