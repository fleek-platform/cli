import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { enterSiteNamePrompt } from './enterSiteNamePrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue('testSite'),
}));

describe('Enter build command prompt', () => {
  it('returns the correct build command', async () => {
    await expect(enterSiteNamePrompt()).resolves.toEqual('testSite');

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
