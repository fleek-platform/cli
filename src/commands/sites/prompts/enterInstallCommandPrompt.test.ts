import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { enterInstallCommandPrompt } from './enterInstallCommandPrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('npm install'),
}));

describe('Enter directory path prompt', () => {
  it('returns the directory if entered by user', async () => {
    await expect(enterInstallCommandPrompt()).resolves.toEqual('npm install');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
