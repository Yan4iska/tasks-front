import { axiosWithAuth } from '@/api/interceptors';
import { ITimeBlockResponse, TypeTimeBlockFormState } from '@/types/time-block.types';

class TimeBlockService {
  private BASE_URL = '/user/time-blocks';

  async getTimeBlocks() {
    const res = await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL);
    return res;
  }

  async createTimeBlock(data: TypeTimeBlockFormState) {
    const res = await axiosWithAuth.post(this.BASE_URL, data);
    return res;
  }

  async updateOrderTimeBLock(ids: string[]) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids });
    return res;
  }

  async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
    return res;
  }

  async deleteTimeBlock(id: string) {
    const res = axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return res;
  }
}

export const timeBlockService = new TimeBlockService();
