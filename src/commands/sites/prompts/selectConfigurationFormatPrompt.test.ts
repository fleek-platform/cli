import { describe, expect, it, vi } from 'vitest';

import { selectConfigurationFormatPrompt } from './selectConfigurationFormatPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('ts'),
}));

describe('Get the configuration format', () => {
  it('returns the selected format', async () => {
    await expect(selectConfigurationFormatPrompt()).resolves.toMatch('ts');
  });
});
