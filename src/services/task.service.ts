import { axiosWithAuth } from '@/api/interceptors';
import { TaskEntity, TaskUpdatePayload } from '@/types/task.types';

class TaskService {
  private BASE_URL = '/user/tasks';

  async getTasks() {
    const res = await axiosWithAuth.get<TaskEntity[]>(this.BASE_URL);
    return res;
  }

  async createTask(data: TaskUpdatePayload) {
    const res = await axiosWithAuth.post(this.BASE_URL, data);
    return res;
  }

  async updateTask(id: string, data: TaskUpdatePayload) {
    const res = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
    return res;
  }

  async deleteTask(id: string) {
    const res = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
    return res;
  }
}

export const taskService = new TaskService();
