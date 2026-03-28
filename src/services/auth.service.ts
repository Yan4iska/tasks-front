import { axiosClassic } from '@/api/interceptors';
import { IAuthForm, IAuthResponse } from '@/types/auth.types';
import { removeFromStorage, saveTokenStorage } from './auth-token.service';

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

export const authService = {
  async main(type: 'login' | 'register', data: IAuthForm) {
    const res = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data);

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken);
  },

  async getNewTokens() {
    const res = await axiosClassic.post<IAuthResponse>('/auth/login/access-token');
    if (res.data.accessToken) saveTokenStorage(res.data.accessToken);
    return res;
  },

  async logout() {
    const res = await axiosClassic.post<boolean>('/auth/logout');

    if (res.data) removeFromStorage();
    return res;
  },
};
