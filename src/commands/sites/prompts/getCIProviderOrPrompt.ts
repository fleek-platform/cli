import type { Choice } from 'prompts';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

const providerChoices: Choice[] = [
  {
    title: 'GitHub Actions',
    description: t('githubActionGenDescription'),
    value: 'github',
  },
];

export type CIProvider = 'github';

type GetCIProviderOrPromptArgs = {
  provider?: CIProvider | undefined;
};

export const getCIProviderOrPrompt = async (
  args?: GetCIProviderOrPromptArgs,
): Promise<CIProvider> => {
  if (args?.provider) {
    return args.provider;
  }

  const provider = await selectPrompt({
    message: `${t('selectProviderForBuildDeploySite')}:`,
    choices: providerChoices,
    initial: 0,
  });

  return provider;
};
