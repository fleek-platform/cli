import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { type FleekRootConfig, FleekSiteConfigFormats } from './types';
import { saveConfiguration } from './saveConfiguration';
import fs from 'fs/promises';
import path from 'path';
import * as ts from 'typescript';

const clearConfigFile = async ({
  configFilePath
}: {
 configFilePath: string | undefined;
}) => {
  if (!configFilePath) throw Error('Oops! Config file path not set.');

  const rootPath = `../../../${configFilePath}`;
  const filePath = path.resolve(__dirname, rootPath);

  const isFile = (await fs.stat(configFilePath)).isFile();

  if (!isFile) throw Error(`Oops! File not found at ${rootPath} for some reason...`);

  await fs.unlink(filePath);

  const isFilePersistent = (await fs.stat(configFilePath)).isFile();

  if (isFilePersistent) throw Error(`Oops! Expected to remove file but persisted at ${rootPath} for some reason...`);
}

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
            buildCommand: ''
          },
        ]
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

 describe.skip('on valid arguments (typescript)', () => {
    let config: FleekRootConfig;
    let format: FleekSiteConfigFormats;
    let configFilePath: string | undefined = '';
    
    beforeEach(() => {
      config = {
        sites: [
          {
            slug: 'barfoo',
            distDir: '.',
            buildCommand: ''
          },
        ]
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
  });
});