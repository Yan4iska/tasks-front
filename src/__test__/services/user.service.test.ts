import { axiosWithAuth } from '@/api/interceptors';
import { userService } from '@/services/user.service';
import { TypeUserForm } from '@/types/auth.types';

jest.mock('@/api/interceptors', () => ({
  axiosWithAuth: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getProfile: должен отправить GET-запрос и вернуть данные', async () => {
    const mockResponse = {
      user: { id: '1', email: 'test@mail.com', name: 'Test' },
      statistics: [{ label: 'Tasks completed', val: '42' }],
    };

    (axiosWithAuth.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await userService.getProfile();

    expect(axiosWithAuth.get).toHaveBeenCalledWith('/user/profile');
    expect(result).toEqual(mockResponse);
  });

  it('update: должен отправить PUT-запрос с данными формы и вернуть результат', async () => {
    const formData: TypeUserForm = {
      email: 'new@mail.com',
      name: 'New Name',
    };

    const mockResult = { success: true };
    (axiosWithAuth.put as jest.Mock).mockResolvedValue({ data: mockResult });

    const result = await userService.update(formData);

    expect(axiosWithAuth.put).toHaveBeenCalledWith('/user/profile', formData);
    expect(result).toEqual(mockResult);
  });
});
