import { DomainHostnameInvalidError } from '@fleek-platform/errors';
import { describe, expect, it, vi } from 'vitest';

import { getHostnameOrPrompt } from './getHostnameOrPrompt';

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({ value: 'first.xyz' }),
}));

describe('Validate given hostname or let the user enter hostname', () => {
  it('Return valid hostname', async () => {
    await expect(
      getHostnameOrPrompt({ hostname: 'first.xyz' }),
    ).resolves.toMatch('first.xyz');
  });

  it('Throw an error on invalid hostname', async () => {
    const invalidHostname = 'sss sss ';
    await expect(
      getHostnameOrPrompt({ hostname: invalidHostname }),
    ).rejects.toThrowError(
      new DomainHostnameInvalidError({ hostname: invalidHostname }),
    );
  });

  it('Let the user enter hostname and return it', async () => {
    await expect(getHostnameOrPrompt({})).resolves.toMatch('first.xyz');
  });
});
