import {
  FleekConfigInvalidContentError,
  FleekConfigMissingFileError,
  type FleekError,
} from '@fleek-platform/errors';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { loadConfiguration } from '../../utils/configuration/loadConfiguration';
import { t } from '../../utils/translation';
import { confirmFileOverridePrompt } from './prompts/confirmFileOverridePrompt';
import { initConfiguration } from './utils/initCongifuration';

const initAction: SdkGuardedFunction = async ({ sdk }) => {
  const configLoadingResult = await loadConfiguration({})
    .then(() => {
      return { isContentValid: true, isFilePresent: true } as const;
    })
    .catch((e: FleekError<unknown>) => {
      if (e instanceof FleekConfigInvalidContentError) {
        return {
          isContentValid: false,
          isFilePresent: true,
          configPath: e.data.configPath,
        } as const;
      }

      if (e instanceof FleekConfigMissingFileError) {
        return { isContentValid: false, isFilePresent: false } as const;
      }

      throw e;
    });

  if (configLoadingResult.isContentValid && configLoadingResult.isFilePresent) {
    output.error(t('configFileExists'));
    output.printNewLine();
    output.log(t('siteAlreadyExists'));

    return;
  }

  if (
    !configLoadingResult.isContentValid &&
    configLoadingResult.isFilePresent
  ) {
    const overrideInvalidConfig = await confirmFileOverridePrompt({
      path: configLoadingResult.configPath,
    });

    if (!overrideInvalidConfig) {
      return;
    }
  }

  await initConfiguration({ sdk });

  output.printNewLine();
  output.success(t('fleekConfigSaved'));
  output.printNewLine();
};

export const initActionHandler = withGuards(initAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
