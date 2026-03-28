import { axiosWithAuth } from '@/api/interceptors';
import { taskService } from '@/services/task.service';
import { TypeTaskFormState } from '@/types/task.types';

jest.mock('@/api/interceptors', () => ({
  axiosWithAuth: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('TaskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getTasks: должен отправить GET-запрос и вернуть список задач', async () => {
    const mockTasks = [{ id: '1', title: 'Test Task' }];
    (axiosWithAuth.get as jest.Mock).mockResolvedValue(mockTasks);

    const result = await taskService.getTasks();

    expect(axiosWithAuth.get).toHaveBeenCalledWith('/user/tasks');
    expect(result).toEqual(mockTasks);
  });

  it('createTask: должен отправить POST-запрос с данными формы', async () => {
    const formData: TypeTaskFormState = {
      name: 'New Task',
      priority: 'medium',
      isCompleted: false,
    };

    const mockResponse = { id: '2', ...formData };
    (axiosWithAuth.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await taskService.createTask(formData);

    expect(axiosWithAuth.post).toHaveBeenCalledWith('/user/tasks', formData);
    expect(result).toEqual(mockResponse);
  });

  it('updateTask: должен отправить PUT-запрос с id и новыми данными', async () => {
    const id = '1';
    const updateData: TypeTaskFormState = {
      name: 'Updated Task',
      priority: 'low',
      isCompleted: true,
    };

    const mockResponse = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await taskService.updateTask(id, updateData);

    expect(axiosWithAuth.put).toHaveBeenCalledWith(`/user/tasks/${id}`, updateData);
    expect(result).toEqual(mockResponse);
  });

  it('deleteTask: должен отправить DELETE-запрос по id', async () => {
    const id = '1';
    const mockResponse = { success: true };
    (axiosWithAuth.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await taskService.deleteTask(id);

    expect(axiosWithAuth.delete).toHaveBeenCalledWith(`/user/tasks/${id}`);
    expect(result).toEqual(mockResponse);
  });
});
