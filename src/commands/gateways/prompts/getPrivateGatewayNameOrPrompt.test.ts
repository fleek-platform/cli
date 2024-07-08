import { PrivateGatewayNameInvalidError } from '@fleek-platform/errors';
// eslint-disable-next-line no-restricted-imports
import prompts from 'prompts';
import { describe, expect, it, vi } from 'vitest';

import { getPrivateGatewayNameOrPrompt } from './getPrivateGatewayNameOrPrompt';

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({ value: 'second' }),
}));

describe('Validate private gateway name or let the user enter name', () => {
  it('Return valid name', async () => {
    await expect(
      getPrivateGatewayNameOrPrompt({ name: 'first' }),
    ).resolves.toEqual('first');

    expect(prompts).not.toHaveBeenCalled();
  });

  it('Throw an error on invalid name', async () => {
    await expect(getPrivateGatewayNameOrPrompt({ name: '*' })).rejects.toEqual(
      new PrivateGatewayNameInvalidError({ name: '*' }),
    );

    expect(prompts).not.toHaveBeenCalled();
  });

  it('Let the user enter name', async () => {
    await expect(getPrivateGatewayNameOrPrompt({})).resolves.toEqual('second');

    expect(prompts).toHaveBeenCalledOnce();
  });
});
