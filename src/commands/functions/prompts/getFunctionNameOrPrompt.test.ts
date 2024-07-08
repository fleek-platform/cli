import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { getFunctionNameOrPrompt } from './getFunctionNameOrPrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('test-function'),
}));

describe('Get function name', () => {
  it('returns the function name', async () => {
    await expect(
      getFunctionNameOrPrompt({ name: 'test-function' }),
    ).resolves.toEqual('test-function');
  });
});

describe('Prompt user for function name', () => {
  it('shows text prompt for function name', async () => {
    await expect(getFunctionNameOrPrompt({})).resolves.toEqual('test-function');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
