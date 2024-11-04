import { createRequire } from 'node:module';

import { promises as fs } from 'node:fs';
import { extname as getExtension } from 'node:path';
import {
  FleekConfigInvalidContentError,
  FleekConfigMissingFileError,
} from '@fleek-platform/errors';
import { register as registerTSNodeCompiler } from 'ts-node';

import { t } from '../../utils/translation';
import { getConfigurationPath } from './getConfiguration';

type ReadConfigurationFileArgs = {
  predefinedConfigPath?: string;
};

export const readConfigurationFile = async ({
  predefinedConfigPath,
}: ReadConfigurationFileArgs): Promise<{
  configuration: object;
  configPath: string;
}> => {
  const configPath = await getConfigurationPath({ predefinedConfigPath });

  const fileExtension = getExtension(configPath);

  if (fileExtension === '.json') {
    const content = await fs
      .readFile(configPath, 'utf8')
      .catch(() => Promise.reject(new FleekConfigMissingFileError({})));

    try {
      return { configuration: JSON.parse(content), configPath };
    } catch (e) {
      throw new FleekConfigInvalidContentError({
        configPath,
        validationResult: t('jsonNotValid'),
      });
    }
  }

  if (fileExtension === '.ts') {
    registerTSNodeCompiler({ skipProject: true });
  }

  if (['.js', '.ts'].includes(fileExtension)) {
    try {
      createRequire(configPath);
    } catch (e) {
      throw new FleekConfigMissingFileError({ configPath });
    }

    try {
      // TODO: The `import` throws `UNKNOWN_FILE_EXTENSION`
      // Tried `ts-node/register` without success
      // Ideally `ts-node` should be removed
      // use `bun` or the new `deno` v2
      // Obs: For past months `bun` has been impeccable
      const loadedConfigModule = await (async () => {
        if (fileExtension.toLowerCase() === '.ts') {
          const x = await import('importx');
          const { default: loadedConfigModule } = await x.import(
            configPath,
            __filename,
          );
          return loadedConfigModule;
        }
        return import(configPath);
      })();

      if (typeof loadedConfigModule.default === 'function') {
        return {
          configuration: await loadedConfigModule.default(),
          configPath,
        };
      }

      if (typeof loadedConfigModule.default !== 'undefined') {
        return { configuration: await loadedConfigModule.default, configPath };
      }

      if (typeof loadedConfigModule === 'function') {
        return { configuration: await loadedConfigModule(), configPath };
      }

      if (typeof loadedConfigModule !== 'undefined') {
        return { configuration: await loadedConfigModule, configPath };
      }
    } catch (e) {
      throw new FleekConfigInvalidContentError({
        configPath,
        validationResult: e instanceof Error ? e.message : '',
      });
    }
  }

  throw new FleekConfigInvalidContentError({
    configPath,
    validationResult: t('unknownFileExt'),
  });
};
