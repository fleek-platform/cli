import { describe, expect, it } from 'vitest';

import { isValidFleekConfigFormat } from './formats';
import { FleekSiteConfigFormats } from './configuration';

describe('In the Formats utils', () => {
  describe('isValidFleekConfigFormat', () => {
    it('should be true for JSON', () => {
      expect(isValidFleekConfigFormat("JSON")).toBe(true);
    });
    it('should be true for Typescript', () => {
      expect(isValidFleekConfigFormat("Typescript")).toBe(true);
    });
    it('should be true for Javascript', () => {
      expect(isValidFleekConfigFormat("Javascript")).toBe(true);
    });
    it('should be false for unknown formats', () => {
      expect(isValidFleekConfigFormat("foobar" as unknown as keyof typeof FleekSiteConfigFormats)).toBe(false);
    });
  });
});
