import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { enterBuildCommandPrompt } from './enterBuildCommandPrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('npm build'),
}));

describe('Enter build command prompt', () => {
  it('returns the correct build command', async () => {
    await expect(enterBuildCommandPrompt()).resolves.toEqual('npm build');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
