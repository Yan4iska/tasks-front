import { axiosClassic } from '@/api/interceptors';
import { apiDebug } from '@/lib/api-debug';
import { IAuthForm, IAuthResponse } from '@/types/auth.types';
import { getAccessToken, removeFromStorage, saveTokenStorage } from './auth-token.service';

function assertAuthPayload(data: unknown): asserts data is IAuthResponse {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid auth response: empty body');
  }
  const token = (data as IAuthResponse).accessToken;
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid auth response: missing accessToken');
  }
}

export const authService = {
  async main(type: 'login' | 'register', data: IAuthForm): Promise<IAuthResponse> {
    const url = `/auth/${type}`;
    apiDebug('POST', { url, baseURL: axiosClassic.defaults?.baseURL, type });

    const res = await axiosClassic.post<IAuthResponse>(url, data);
    apiDebug('POST ok', { status: res.status, hasUser: Boolean(res.data?.user) });

    assertAuthPayload(res.data);
    saveTokenStorage(res.data.accessToken);

    if (typeof window !== 'undefined' && !getAccessToken()) {
      throw new Error(
        'Access token was not stored (cookies blocked or misconfigured). Allow cookies for this site.',
      );
    }

    return res.data;
  },

  async getNewTokens() {
    const res = await axiosClassic.post<IAuthResponse>('/auth/login/access-token');
    assertAuthPayload(res.data);
    saveTokenStorage(res.data.accessToken);
    if (typeof window !== 'undefined' && !getAccessToken()) {
      throw new Error('Access token was not stored after refresh.');
    }
    return res;
  },

  async logout() {
    const res = await axiosClassic.post<boolean>('/auth/logout');

    if (res.data) removeFromStorage();
    return res;
  },
};
