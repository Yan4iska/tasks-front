import { authService } from '@/services/auth.service';
import { axiosClassic } from '@/api/interceptors';
import * as tokenService from '@/services/auth-token.service';

jest.mock('@/api/interceptors', () => ({
  axiosClassic: {
    post: jest.fn(),
  },
}));

jest.mock('@/services/auth-token.service', () => ({
  saveTokenStorage: jest.fn(),
  removeFromStorage: jest.fn(),
  getAccessToken: jest.fn(() => 'test-token'),
}));

describe('authService', () => {
  const mockResponse = {
    data: {
      accessToken: 'test-token',
      user: { id: 1, email: 'test@example.com' },
    },
  };

  beforeEach(() => {
    (axiosClassic.post as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call /auth/login and save token', async () => {
    (axiosClassic.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    await authService.main('login', { email: 'test@example.com', password: '1234' });

    expect(axiosClassic.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@example.com',
      password: '1234',
    });
    expect(tokenService.saveTokenStorage).toHaveBeenCalledWith('test-token');
  });

  it('should call /auth/register and save token', async () => {
    (axiosClassic.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    await authService.main('register', { email: 'test@example.com', password: '1234' });

    expect(axiosClassic.post).toHaveBeenCalledWith('/auth/register', {
      email: 'test@example.com',
      password: '1234',
    });
    expect(tokenService.saveTokenStorage).toHaveBeenCalledWith('test-token');
  });

  it('should reject when accessToken is missing (no false success)', async () => {
    (axiosClassic.post as jest.Mock).mockResolvedValueOnce({ data: { user: {} } });

    await expect(
      authService.main('login', { email: 'test@example.com', password: '1234' }),
    ).rejects.toThrow(/missing accessToken/);

    expect(tokenService.saveTokenStorage).not.toHaveBeenCalled();
  });

  it('should call /auth/login/access-token and save token', async () => {
    (axiosClassic.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const res = await authService.getNewTokens();

    expect(axiosClassic.post).toHaveBeenCalledWith('/auth/login/access-token');
    expect(tokenService.saveTokenStorage).toHaveBeenCalledWith('test-token');
    expect(res).toEqual(mockResponse);
  });

  it('should call /auth/logout and remove token', async () => {
    (axiosClassic.post as jest.Mock).mockResolvedValueOnce({ data: true });

    const res = await authService.logout();

    expect(axiosClassic.post).toHaveBeenCalledWith('/auth/logout');
    expect(tokenService.removeFromStorage).toHaveBeenCalled();
    expect(res).toEqual({ data: true });
  });
});
