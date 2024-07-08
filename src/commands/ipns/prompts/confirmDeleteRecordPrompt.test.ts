import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmDeleteRecordPrompt } from './confirmDeleteRecordPrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm record deletion', () => {
  it('returns the correct value from prompt', async () => {
    await expect(confirmDeleteRecordPrompt()).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
