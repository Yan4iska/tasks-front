import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with default value and eventually set isLoading to false', async () => {
    const { result } = renderHook(() => useLocalStorage({ key: KEY, defaultValue: 'default' }));

    // Начальное значение value — default
    expect(result.current[0]).toBe('default');

    // Ждём, пока isLoading станет false
    await waitFor(() => expect(result.current[2]).toBe(false));
  });

  it('should load value from localStorage if exists', async () => {
    const storedValue = JSON.stringify('stored value');
    localStorage.setItem(KEY, storedValue);

    const { result } = renderHook(() => useLocalStorage({ key: KEY, defaultValue: 'default' }));

    await waitFor(() => expect(result.current[2]).toBe(false));

    expect(result.current[0]).toBe('stored value');
  });

  it('should update localStorage when value changes', async () => {
    const { result } = renderHook(() => useLocalStorage({ key: KEY, defaultValue: 'default' }));

    await waitFor(() => expect(result.current[2]).toBe(false));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('new value'));
  });

  it('should handle JSON parse error gracefully', async () => {
    localStorage.setItem(KEY, 'not-json');

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage({ key: KEY, defaultValue: 'default' }));

    await waitFor(() => expect(result.current[2]).toBe(false));

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should not write to localStorage on initial render', async () => {
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

    const { result } = renderHook(() => useLocalStorage({ key: KEY, defaultValue: 'default' }));

    await waitFor(() => expect(result.current[2]).toBe(false));

    expect(setItemSpy).not.toHaveBeenCalled();

    setItemSpy.mockRestore();
  });
});
