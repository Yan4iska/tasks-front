import { axiosWithAuth } from '@/api/interceptors';
import { pomodoroService } from '@/services/pomodoro.service';
import { TypePomodoroSessionFromState } from '@/types/pomodoro.types';

jest.mock('@/api/interceptors', () => ({
  axiosWithAuth: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('PomodoroService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getTodaySession: должен отправить GET-запрос и вернуть сессию за сегодня', async () => {
    const mockResponse = { id: '1', isCompleted: false };
    (axiosWithAuth.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pomodoroService.getTodaySession();

    expect(axiosWithAuth.get).toHaveBeenCalledWith('/user/timer/today');
    expect(result).toEqual(mockResponse);
  });

  it('createSession: должен отправить POST-запрос и вернуть новую сессию', async () => {
    const mockResponse = { id: '1', isCompleted: false };
    (axiosWithAuth.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pomodoroService.createSession();

    expect(axiosWithAuth.post).toHaveBeenCalledWith('/user/timer');
    expect(result).toEqual(mockResponse);
  });

  it('deleteSession: должен отправить DELETE-запрос по ID', async () => {
    const id = '1';
    const mockResponse = { success: true };
    (axiosWithAuth.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pomodoroService.deleteSession(id);

    expect(axiosWithAuth.delete).toHaveBeenCalledWith(`/user/timer/${id}`);
    expect(result).toEqual(mockResponse);
  });

  it('updateSession: должен отправить PUT-запрос на /round{ID} с данными', async () => {
    const id = '123';
    const data: TypePomodoroSessionFromState = {
      isCompleted: true,
    };
    const mockResponse = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pomodoroService.updateSession(id, data);

    expect(axiosWithAuth.put).toHaveBeenCalledWith(`/user/timer/round${id}`, data);
    expect(result).toEqual(mockResponse);
  });

  it('updateRound: должен отправить PUT-запрос на /round/{ID} с данными', async () => {
    const id = '456';
    const data: TypePomodoroSessionFromState = {
      isCompleted: true,
    };
    const mockResponse = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pomodoroService.updateRound(id, data);

    expect(axiosWithAuth.put).toHaveBeenCalledWith(`/user/timer/round/${id}`, data);
    expect(result).toEqual(mockResponse);
  });
});
