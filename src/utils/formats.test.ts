import { describe, expect, it } from 'vitest';

import { isValidFleekConfigFormat } from './formats';
import { FleekSiteConfigFormats } from './configuration';

describe('In the Formats utils', () => {
  describe('isValidFleekConfigFormat', () => {
    it('should be true for JSON', () => {
      expect(isValidFleekConfigFormat(FleekSiteConfigFormats.JSON)).toBe(true);
    });
    it('should be true for Typescript', () => {
      expect(isValidFleekConfigFormat(FleekSiteConfigFormats.Typescript)).toBe(
        true,
      );
    });
    it('should be true for Javascript', () => {
      expect(isValidFleekConfigFormat(FleekSiteConfigFormats.Javascript)).toBe(
        true,
      );
    });
    it('should be false for unknown formats', () => {
      expect(
        isValidFleekConfigFormat('foobar' as unknown as FleekSiteConfigFormats),
      ).toBe(false);
    });
  });
});
