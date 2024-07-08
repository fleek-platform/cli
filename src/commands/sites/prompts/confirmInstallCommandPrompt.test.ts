import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmInstallCommandPrompt } from './confirmInstallCommandPrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm build command prompt', () => {
  it('returns the selected value', async () => {
    await expect(
      confirmInstallCommandPrompt({ installCommand: 'npm install' }),
    ).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
