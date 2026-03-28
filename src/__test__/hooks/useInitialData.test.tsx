import { renderHook } from '@testing-library/react';
import { useInitialData } from '@/hooks/useInitialData';
import * as useProfileModule from '@/hooks/useProfile';
import { TypeUserForm } from '@/types/auth.types';

jest.mock('@/hooks/useProfile');

describe('useInitialData', () => {
  const mockReset = jest.fn();

  const validUser: TypeUserForm = {
    email: 'test@example.com',
    name: 'Test User',
    breakInterval: 5,
    intervalsCount: 4,
    workInterval: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls reset with correct data when isSuccess is true and user exists', () => {
    (useProfileModule.default as jest.Mock).mockReturnValue({
      data: { user: validUser },
      isSuccess: true,
    });

    renderHook(() => useInitialData(mockReset));

    expect(mockReset).toHaveBeenCalledWith({
      email: validUser.email,
      name: validUser.name,
      breakInterval: validUser.breakInterval,
      intervalsCount: validUser.intervalsCount,
      workInterval: validUser.workInterval,
    });
  });

  it('does not call reset when isSuccess is false', () => {
    (useProfileModule.default as jest.Mock).mockReturnValue({
      data: { user: validUser },
      isSuccess: false,
    });

    renderHook(() => useInitialData(mockReset));

    expect(mockReset).not.toHaveBeenCalled();
  });

  it('does not call reset when data is null', () => {
    (useProfileModule.default as jest.Mock).mockReturnValue({
      data: null,
      isSuccess: true,
    });

    renderHook(() => useInitialData(mockReset));

    expect(mockReset).not.toHaveBeenCalled();
  });

  it('does not call reset when data.user is undefined', () => {
    (useProfileModule.default as jest.Mock).mockReturnValue({
      data: { user: undefined },
      isSuccess: true,
    });

    renderHook(() => useInitialData(mockReset));

    expect(mockReset).not.toHaveBeenCalled();
  });

  it('does not call reset when data.user is null', () => {
    (useProfileModule.default as jest.Mock).mockReturnValue({
      data: { user: null },
      isSuccess: true,
    });

    renderHook(() => useInitialData(mockReset));

    expect(mockReset).not.toHaveBeenCalled();
  });
});
