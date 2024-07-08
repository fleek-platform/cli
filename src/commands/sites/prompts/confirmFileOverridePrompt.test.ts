import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmFileOverridePrompt } from './confirmFileOverridePrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm file overriding prompt', () => {
  it('returns the selected value', async () => {
    await expect(
      confirmFileOverridePrompt({ path: 'testpath.txt' }),
    ).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
