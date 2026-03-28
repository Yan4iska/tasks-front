import { axiosWithAuth } from '@/api/interceptors';
import { IUser, TypeUserForm } from '@/types/auth.types';

export interface IProfileResponse {
  user: IUser;
  statistics: {
    label: string;
    val: string;
  }[];
}

class UserService {
  private BASE_URL = '/user/profile';

  async getProfile() {
    const res = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
    return res.data;
  }

  async update(data: TypeUserForm) {
    const res = await axiosWithAuth.put(this.BASE_URL, data);
    return res.data;
  }
}

export const userService = new UserService();
