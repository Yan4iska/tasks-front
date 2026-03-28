/** Cookie names shared with the API — keep this module dependency-free (middleware runs on Edge). */
export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;
