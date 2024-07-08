import { describe, expect, it, vi } from 'vitest';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { confirmWorkflowCustomPathPrompt } from './confirmWorkflowCustomPathPrompt';

vi.mock('../../../prompts/confirmPrompt', () => ({
  confirmPrompt: vi.fn().mockResolvedValue(true),
}));

describe('Confirm default workflow file path prompt', () => {
  it('returns the selected value', async () => {
    await expect(
      confirmWorkflowCustomPathPrompt({ path: 'testpath.json ' }),
    ).resolves.toEqual(true);

    expect(confirmPrompt).toHaveBeenCalledOnce();
  });
});
