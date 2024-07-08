import { describe, expect, it, vi } from 'vitest';

import { textPrompt } from '../../../prompts/textPrompt';
import { getFunctionPathOrPrompt } from './getFunctionPathOrPrompt';

vi.mock('../../../prompts/textPrompt', () => ({
  textPrompt: vi.fn().mockResolvedValue(`${__dirname}/test.js`),
}));

describe('Get function code', () => {
  it('returns the function code', async () => {
    await expect(
      getFunctionPathOrPrompt({ path: `${__dirname}/testNoPrompt.js` }),
    ).resolves.toStrictEqual(`${__dirname}/testNoPrompt.js`);
  });
});

describe('Prompt user for function code path', () => {
  it('shows text prompt for function code', async () => {
    await expect(getFunctionPathOrPrompt({})).resolves.toStrictEqual(
      `${__dirname}/test.js`,
    );

    expect(textPrompt).toHaveBeenCalledOnce();
  });
});
