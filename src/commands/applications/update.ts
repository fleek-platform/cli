import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { enterApplicationNameOrPrompt } from './prompts/enterApplicationNameOrPrompt';
import { getApplicationOrPrompt } from './prompts/getApplicationOrPrompt';
import { getWhitelistDomainsOrPrompt } from './prompts/getWhitelistDomainsOrPrompt';

type UpdateApplicationArgs = {
  id?: string;
  name?: string;
  whitelistDomains?: string[];
};

const updateApplicationAction: SdkGuardedFunction<
  UpdateApplicationArgs
> = async ({ sdk, args }) => {
  const application = await getApplicationOrPrompt({ id: args.id, sdk });

  if (!application) {
    output.error(t('noAppFoundUnexpectedly'));

    return;
  }

  const name = await enterApplicationNameOrPrompt({
    name: args.name,
    application,
  });

  const whitelistDomains = await getWhitelistDomainsOrPrompt({
    whitelistDomains: args.whitelistDomains,
    whitelistDomainsToUpdate: application.whitelistDomains.map(
      (whitelistDomain) => whitelistDomain.hostname,
    ),
  });

  // Warning: The WhiteLabelDomains has been deprecated
  // the sdk applications update copies new to old for
  // retroactivity support.
  await sdk
    .applications()
    .update({ id: application.id, name, whitelistDomains });

  output.printNewLine();
  output.success(t('appClientSuccessUpdated'));
};

export const updateApplicationActionHandler = withGuards(
  updateApplicationAction,
  {
    scopes: {
      authenticated: true,
      project: true,
      site: false,
    },
  },
);
