import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProfile from '@/hooks/useProfile';
import { userService, IProfileResponse } from '@/services/user.service';
import React from 'react';

jest.mock('@/services/user.service', () => ({
  userService: {
    getProfile: jest.fn(),
  },
}));

describe('useProfile', () => {
  const mockProfile: IProfileResponse = {
    user: {
      id: 1,
      email: 'john@example.com',
      name: 'John',
      workInterval: 25,
      breakInterval: 5,
      intervalsCount: 4,
    },
    statistics: [],
  };

  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // чтобы не ждать лишние повторы
        },
      },
    });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={createQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  it('should return profile data on success', async () => {
    (userService.getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const { result } = renderHook(() => useProfile(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProfile);
    expect(result.current.isLoading).toBe(false);
  });
});
