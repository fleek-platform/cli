import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmUserWantsInstallCommandPrompt } from './confirmUserWantsInstallCommandPrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm build command prompt', () => {
  it('returns the selected value', async () => {
    await expect(confirmUserWantsInstallCommandPrompt()).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
