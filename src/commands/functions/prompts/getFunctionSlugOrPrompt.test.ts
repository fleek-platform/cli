import { describe, expect, it } from 'vitest';

import { getFunctionSlugOrPrompt } from './getFunctionSlugOrPrompt';

describe('Get function slug', () => {
  it('returns the function slug', async () => {
    await expect(
      getFunctionSlugOrPrompt({ slug: 'test-slug' }),
    ).resolves.toEqual('test-slug');
  });
});
