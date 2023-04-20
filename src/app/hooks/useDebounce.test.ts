import { act, renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';

export type UseDebounceReturn = [() => boolean | null, () => void];

describe('useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('should execute immediately for the first time', () => {
    const value = 'Hello World';
    const { result } = renderHook(() => useDebounce(value, 0));

    expect(result.current).toBe('Hello World');
  });

  it('should execute callback after specified intervals', () => {
    const callback = jest.fn();

    renderHook(() => useDebounce(callback, 1000));

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should update values after defined intervals', () => {
    let value = 'Hello World';

    const { rerender, result } = renderHook(() => useDebounce(value, 1000));

    value = 'Foo Bar';
    rerender();

    expect(result.current).toBe('Hello World');

    act(() => {
      // Timer has not crossed delay
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('Hello World');

    act(() => {
      // Timer has crossed delay
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('Foo Bar');
  });

  it('should reset timeout on delay change', () => {
    const value = 'Hello World';
    const delay = 1000;

    const { result, rerender } = renderHook(
      ({ value = 'TEST', delay = 1000 }) => useDebounce(value, delay),
      {
        initialProps: {
          value: value,
          delay: delay,
        },
      },
    );

    act(() => {
      rerender({ value: 'Delayed', delay: 1000 });
    });

    expect(result.current).toBe(value);
    act(() => {});
    expect(result.current).toBe(value);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('Delayed');
  });

  it('should reset timeout on value change', () => {
    const value = 'Hello World';
    const delay = 1000;

    const { result, rerender } = renderHook(
      ({ value = 'TEST', delay = 1000 }) => useDebounce(value, delay),
      {
        initialProps: {
          value: value,
          delay: delay,
        },
      },
    );

    jest.advanceTimersByTime(900);
    expect(result.current).toBe(value);

    act(() => {
      rerender({ delay: 1100, value: 'Try Again!' });
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(value);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('Try Again!');
  });
});
