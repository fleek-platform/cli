import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { enterFunctionNamePrompt } from './enterFunctionNamePrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('testFunction'),
}));

describe('Enter function name prompt', () => {
  it('returns the correct function name', async () => {
    await expect(enterFunctionNamePrompt()).resolves.toEqual('testFunction');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
