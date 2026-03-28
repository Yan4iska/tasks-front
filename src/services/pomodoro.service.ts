import { axiosWithAuth } from '@/api/interceptors';
import { IPomodoroSessionResponse, TypePomodoroSessionFromState } from '@/types/pomodoro.types';

class PomodoroService {
  private BASE_URL = '/user/timer';

  async getTodaySession() {
    const res = await axiosWithAuth.get<IPomodoroSessionResponse>(`${this.BASE_URL}/today`);
    return res;
  }

  async createSession() {
    const res = await axiosWithAuth.post<IPomodoroSessionResponse>(this.BASE_URL);
    return res;
  }

  async deleteSession(id: string) {
    const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return res;
  }

  async updateSession(id: string, data: TypePomodoroSessionFromState) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/round${id}`, data);

    return res;
  }

  async updateRound(id: string, data: TypePomodoroSessionFromState) {
    const response = await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data);
    return response;
  }
}

export const pomodoroService = new PomodoroService();
