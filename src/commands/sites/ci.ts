import { output } from '../../cli';
import { config } from '../../config';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import {
  type CIProvider,
  getCIProviderOrPrompt,
} from './prompts/getCIProviderOrPrompt';
import { prepareGitHubActionsIntegration } from './utils/prepareGitHubActionsIntegration';

type CiActionArgs = {
  predefinedConfigPath?: string;
  provider?: string;
};

const ciAction: SdkGuardedFunction<CiActionArgs> = async ({ args }) => {
  const provider = await getCIProviderOrPrompt({
    provider: args?.provider as CIProvider,
  });

  const personalAccessToken = config.personalAccessToken.get();
  const projectId = config.projectId.get();

  if (!personalAccessToken) {
    output.error(t('noPatFoundUnexpectedly'));

    return;
  }

  if (!projectId) {
    output.error(t('noProjectIdFoundUnexpectedly'));

    return;
  }

  switch (provider) {
    case 'github':
      await prepareGitHubActionsIntegration({
        projectId,
        personalAccessToken,
        fleekConfigPath: args.predefinedConfigPath,
        output,
      });
      break;
    default:
      output.error(t('providerNotSupported'));

      return;
  }
};

export const ciActionHandler = withGuards(ciAction, {
  scopes: {
    project: true,
    site: true,
    authenticated: true,
  },
});
