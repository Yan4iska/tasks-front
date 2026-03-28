import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { DASHBOARD_PAGES } from './config/pages-url.config';
import { AUTH_COOKIES } from './constants/auth-cookies.constants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  const accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  /** Refresh is httpOnly on the API host; on Vercel-only origin it is often absent while accessToken is set by the client. */
  const hasAuthCookie = Boolean(refreshToken || accessToken);

  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage && hasAuthCookie) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!hasAuthCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/i/:path*', '/auth', '/auth/:path*'],
};
