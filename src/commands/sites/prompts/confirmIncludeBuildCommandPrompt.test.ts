import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmIncludeBuildCommandPrompt } from './confirmIncludeBuildCommandPrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm build command prompt', () => {
  it('returns the selected value', async () => {
    await expect(confirmIncludeBuildCommandPrompt()).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
