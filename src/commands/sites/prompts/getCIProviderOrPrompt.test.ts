import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getCIProviderOrPrompt } from './getCIProviderOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('github'),
}));

describe('Get CI Provider from the list', () => {
  it('returns the selected providers name', async () => {
    await expect(getCIProviderOrPrompt()).resolves.toEqual('github');

    expect(selectPrompt).toHaveBeenCalledOnce();
  });

  it('returns the parameter providers name', async () => {
    (selectPrompt as Mock).mockResolvedValueOnce('someProvider');
    await expect(
      getCIProviderOrPrompt({ provider: 'github' }),
    ).resolves.toEqual('github');

    expect(selectPrompt).not.toHaveBeenCalled();
  });
});
