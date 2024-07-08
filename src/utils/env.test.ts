import { describe, expect, it } from 'vitest';

import { parseEnvVarsAsKeyVal } from './env';

const DEFAULT_PREFIX = 'process.env.';
const DEFAULT_MOCK_ADDR = 'https://mock.fleek.xyz';
const definedMock = {
  UI__APP_URL: DEFAULT_MOCK_ADDR,
  SDK__GRAPHQL_API_URL: `${DEFAULT_MOCK_ADDR}/graphql`,
};

describe('Parse environment variables', () => {
  describe('For bundler purposes (esbuild)', () => {
    it('Should have quoted values', () => {
      const parsed = parseEnvVarsAsKeyVal({
        defined: definedMock,
      });

      expect(parsed).toMatchObject({
        'process.env.UI__APP_URL': '"https://mock.fleek.xyz"',
        'process.env.SDK__GRAPHQL_API_URL': '"https://mock.fleek.xyz/graphql"',
      });
    });

    it('Should have correct keys count', () => {
      const parsed = parseEnvVarsAsKeyVal({
        defined: definedMock,
      });

      expect(Object.keys(parsed).length).toEqual(2);
    });

    it('Should have correct keys count (strict name matches)', () => {
      const parsed = parseEnvVarsAsKeyVal({
        defined: definedMock,
      });

      const matches = Object.keys(parsed).filter((k) =>
        k.startsWith(DEFAULT_PREFIX),
      );

      expect(matches.length).toEqual(2);
    });

    it('Should have prefixed key names (default)', () => {
      const parsed = parseEnvVarsAsKeyVal({
        defined: definedMock,
      });

      const matches = Object.keys(parsed).filter((k) =>
        k.startsWith(DEFAULT_PREFIX),
      );

      expect(matches).toBeDefined();
      expect(matches.length).toEqual(2);
    });

    it('Should throw when a defined key value is empty (any)', () => {
      const overrideDefinedMock = {
        ...definedMock,
        UI__APP_URL: '',
      };

      expect(() =>
        parseEnvVarsAsKeyVal({ defined: overrideDefinedMock }),
      ).toThrowError();
    });

    it('Should throw when a defined key value is undefined (any)', () => {
      const overrideDefinedMock = {
        ...definedMock,
        SDK__GRAPHQL_API_URL: undefined,
      };

      expect(() =>
        parseEnvVarsAsKeyVal({ defined: overrideDefinedMock }),
      ).toThrowError();
    });

    it('Should throw when a defined key value is undefined (any)', () => {
      const overrideDefinedMock = {
        ...definedMock,
        UI__APP_URL: null,
      };

      expect(() =>
        parseEnvVarsAsKeyVal({ defined: overrideDefinedMock }),
      ).toThrowError();
    });

    it('Should throw when passed data argument is empty object', () => {
      const defined = {};

      expect(() => parseEnvVarsAsKeyVal({ defined })).toThrowError();
    });
  });
});
