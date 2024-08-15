import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ExpectedOneOfValuesError,
  InvalidJSONFormat,
} from '@fleek-platform/errors';
import ts from 'typescript';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fileExists } from '../fs';
import { saveConfiguration } from './saveConfiguration';
import { type FleekRootConfig, FleekSiteConfigFormats } from './types';

const clearConfigFile = async ({
  configFilePath,
}: {
  configFilePath: string | undefined;
}) => {
  if (!configFilePath) throw Error('Oops! Config file path not set.');

  const rootPath = `../../../${configFilePath}`;
  const filePath = path.resolve(__dirname, rootPath);

  const isFile = await fileExists(filePath);

  if (!isFile)
    throw Error(`Oops! File not found at ${rootPath} for some reason...`);

  await fs.unlink(filePath);

  const isFilePersistent = await fileExists(filePath);

  if (isFilePersistent)
    throw Error(
      `Oops! Expected to remove file but persisted at ${rootPath} for some reason...`,
    );
};

describe('The saveConfiguration utils', () => {
  describe('on valid arguments (json)', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;
    let configFilePath: string | undefined = '';

    beforeEach(() => {
      config = {
        sites: [
          {
            slug: 'foobar',
            distDir: '.',
            buildCommand: '',
          },
        ],
      };
      format = FleekSiteConfigFormats.JSON;
    });

    afterEach(async () => {
      try {
        await clearConfigFile({ configFilePath });
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`Oops! ${configFilePath} does not exist.`);
          return;
        }

        throw error;
      }
    });

    it('should return the expected filename (fleek.config.json)', async () => {
      configFilePath = await saveConfiguration({ config, format });
      expect(configFilePath).toBe('fleek.config.json');
    });

    it('should be a valid JSON', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const content = await fs.readFile(configFilePath as string);

      try {
        const parsed = JSON.parse(content.toString());
        const isArray = Array.isArray(parsed.sites);

        expect(isArray).toBe(true);
      } catch (err) {
        throw Error('Oops! Failed to parse file as JSON');
      }
    });

    it('should have certain content properties', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const content = await fs.readFile(configFilePath as string);
      const json = JSON.parse(content.toString());

      expect(json).toHaveProperty('sites');
      expect(json.sites[0]).toHaveProperty('slug');
      expect(json.sites[0]).toHaveProperty('distDir');
    });
  });

  describe('on valid arguments (typescript)', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;
    let configFilePath: string | undefined = '';

    beforeEach(() => {
      config = {
        sites: [
          {
            slug: 'cool-hipnoise',
            distDir: './dist',
            buildCommand: 'npm run build',
          },
        ],
      };
      format = FleekSiteConfigFormats.Typescript;
    });

    afterEach(async () => {
      try {
        await clearConfigFile({ configFilePath });
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`Oops! ${configFilePath} does not exist.`);
          return;
        }

        throw error;
      }
    });

    it('should return the expected filename (fleek.config.ts)', async () => {
      configFilePath = await saveConfiguration({ config, format });
      expect(configFilePath).toBe('fleek.config.ts');
    });

    it('should be valid Typescript', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const content = await fs.readFile(configFilePath as string);

      try {
        const parsed = ts.createSourceFile(
          configFilePath as string,
          content.toString(),
          ts.ScriptTarget.Latest,
        );
        expect(parsed).toHaveProperty('identifiers');
        expect(parsed).toHaveProperty('fileName');
        expect(parsed).toHaveProperty('languageVersion');
      } catch (err) {
        throw Error('Oops! Failed to parse file as Typescript');
      }
    });

    it('should have certain content properties', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const buf = await fs.readFile(configFilePath as string);
      const content = buf.toString();

      expect(content).toContain('@fleek-platform/cli');
      expect(content).toContain('export default');
    });

    it('should be a typescript importable module', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const defaultExport = (await import(configFilePath as string)).default;

      expect(defaultExport).toBeDefined();
    });

    it('should export a default object with specific fields', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const defaultExport = (await import(configFilePath as string)).default;

      expect(Array.isArray(defaultExport.sites)).toBe(true);
      expect(defaultExport.sites[0].slug).toBe('cool-hipnoise');
      expect(defaultExport.sites[0].distDir).toBe('./dist');
      expect(defaultExport.sites[0].buildCommand).toBe('npm run build');
    });
  });

  describe('on valid arguments (javascript)', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;
    let configFilePath: string | undefined = '';

    beforeEach(() => {
      config = {
        sites: [
          {
            slug: 'james-brown',
            distDir: './output',
            buildCommand: 'yarn build',
          },
        ],
      };
      format = FleekSiteConfigFormats.Javascript;
    });

    afterEach(async () => {
      try {
        await clearConfigFile({ configFilePath });
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`Oops! ${configFilePath} does not exist.`);
          return;
        }

        throw error;
      }
    });

    it('should return the expected filename (fleek.config.js)', async () => {
      configFilePath = await saveConfiguration({ config, format });
      expect(configFilePath).toBe('fleek.config.js');
    });

    it('should be valid Javascript', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const content = await fs.readFile(configFilePath as string);

      try {
        const parsed = ts.createSourceFile(
          configFilePath as string,
          content.toString(),
          ts.ScriptTarget.Latest,
        );
        expect(parsed).toHaveProperty('identifiers');
        expect(parsed).toHaveProperty('fileName');
        expect(parsed).toHaveProperty('languageVersion');
      } catch (err) {
        throw Error('Oops! Failed to parse file as Javascript');
      }
    });

    it('should have certain content properties', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const buf = await fs.readFile(configFilePath as string);
      const content = buf.toString();

      expect(content).toContain("import('@fleek-platform/cli').FleekConfig");
      expect(content).toContain('module.exports');
    });

    it('should be a javascript importable module', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const defaultExport = (await import(configFilePath as string)).default;

      expect(defaultExport).toBeDefined();
    });

    it('should export a default object with specific fields', async () => {
      configFilePath = await saveConfiguration({ config, format });
      const defaultExport = (await import(configFilePath as string)).default;

      expect(Array.isArray(defaultExport.sites)).toBe(true);
      expect(defaultExport.sites[0].slug).toBe('james-brown');
      expect(defaultExport.sites[0].distDir).toBe('./output');
      expect(defaultExport.sites[0].buildCommand).toBe('yarn build');
    });
  });

  describe('On unsupported format', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;

    beforeEach(() => {
      config = {
        sites: [
          {
            slug: 'foobar',
            distDir: '.',
            buildCommand: '',
          },
        ],
      };
      format = 'dodgy' as FleekSiteConfigFormats;
    });

    it('should throw an error', async () => {
      await expect(() =>
        saveConfiguration({ config, format }),
      ).rejects.toThrowError();
    });

    it('should throw a known error', async () => {
      await expect(() =>
        saveConfiguration({ config, format }),
      ).rejects.toThrowError(ExpectedOneOfValuesError);
    });
  });

  describe('On invalid JSON', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;

    beforeEach(() => {
      config = ': 12345, foo, { bar: 1}' as unknown as FleekRootConfig;
      format = FleekSiteConfigFormats.JSON;
    });

    it('should throw an error', async () => {
      await expect(() =>
        saveConfiguration({ config, format }),
      ).rejects.toThrowError();
    });

    it('should throw a known error', async () => {
      await expect(() =>
        saveConfiguration({ config, format }),
      ).rejects.toThrowError(InvalidJSONFormat);
    });
  });
});
