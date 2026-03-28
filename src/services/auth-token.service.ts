import { AUTH_COOKIES } from '@/constants/auth-cookies.constants';
import Cookies from 'js-cookie';

function cookieBaseOptions(): Cookies.CookieAttributes {
  if (typeof window === 'undefined') {
    return { expires: 1, sameSite: 'lax', path: '/' };
  }
  const host = window.location.hostname;
  const local = host === 'localhost' || host === '127.0.0.1';
  return {
    path: '/',
    expires: 1,
    sameSite: 'lax',
    secure: !local,
    ...(local ? { domain: 'localhost' } : {}),
  };
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, cookieBaseOptions());
};

export const removeFromStorage = () => {
  Cookies.remove(AUTH_COOKIES.ACCESS_TOKEN, cookieBaseOptions());
};
