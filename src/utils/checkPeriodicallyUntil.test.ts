import { beforeAll, describe, expect, it, vi } from 'vitest';

import { checkPeriodicallyUntil } from './checkPeriodicallyUntil';

describe('Periodically perform action and check whether returns true-like value, if yes or timeout elapsed return last value', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it('should return string on the first try', async () => {
    const value = checkPeriodicallyUntil({
      conditionFn: async () => 'someString',
      period: 1000,
      tries: 10,
    });
    await vi.advanceTimersByTimeAsync(1000);
    await expect(value).resolves.toEqual('someString');
  });

  it('should return null until timeout', async () => {
    const value = checkPeriodicallyUntil({
      conditionFn: async () => null,
      period: 1000,
      tries: 10,
    });
    await vi.advanceTimersByTimeAsync(10000);
    await expect(value).resolves.toBeNull();
  });
});
