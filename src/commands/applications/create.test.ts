import { describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { whitelistArgParser } from './create';

vi.mock('../../cli', () => {
  const output = {
    error: vi.fn(),
    quoted: vi.fn().mockImplementation((message: string) => `"${message}"`),
    spinner: vi.fn(),
    success: vi.fn(),
    hint: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

describe('Create application', () => {
  describe('On non-interactive', () => {
    it('should parse list of domains', () => {
      const arg = ['foo.bar, bar.foo'];

      expect(whitelistArgParser(arg)).toEqual(['foo.bar', 'bar.foo']);
    });

    it('should parse a single domain', () => {
      const arg = ['foobar.xyz'];

      expect(whitelistArgParser(arg)).toEqual(['foobar.xyz']);
    });

    it('should handle errors gracefully (non-intrusive)', () => {
      const arg = 'foobar.xyz';

      // The argument is of wrong ds purposely for testing
      expect(whitelistArgParser(arg as unknown as string[])).toBeUndefined();
    });

    it('should handle errors gracefully (show error message)', () => {
      const arg = 'foobar.xyz';

      // The argument is of wrong ds purposely for testing
      expect(whitelistArgParser(arg as unknown as string[])).toBeUndefined();
      expect(fakeOutput.error).toHaveBeenCalledOnce();
      expect(fakeOutput.error).toHaveBeenCalledWith(
        'Unexpected data argument.',
      );
    });
  });
});
