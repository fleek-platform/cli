import { describe, expect, it } from 'vitest';

import { getFunctionStatusOrPrompt } from './getFunctionStatusOrPrompt';

describe('Get function status', () => {
  it('returns the function status', async () => {
    await expect(
      getFunctionStatusOrPrompt({ status: 'ACTIVE' }),
    ).resolves.toEqual('ACTIVE');
  });
});
