import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { enterDirectoryPathPrompt } from './enterDirectoryPathPrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('testSite'),
}));
vi.mock('../utils/directoryExists', () => ({
  directoryExists: vi.fn().mockResolvedValue(true),
}));

describe('Enter directory path prompt', () => {
  it('returns the directory if entered by user', async () => {
    await expect(
      enterDirectoryPathPrompt({ message: 'Enter a directory' }),
    ).resolves.toEqual('testSite');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
