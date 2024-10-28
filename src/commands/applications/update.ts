import { isHostnameValid } from '@fleek-platform/utils-validation';
import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { enterApplicationNameOrPrompt } from './prompts/enterApplicationNameOrPrompt';
import { getApplicationOrPrompt } from './prompts/getApplicationOrPrompt';
import { getWhitelistDomainsOrPrompt } from './prompts/getWhitelistDomainsOrPrompt';
import { promptUntil } from '../../utils/prompts/promptUntil';

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

  const handler = async () =>
    getWhitelistDomainsOrPrompt({
      whitelistDomains: args.whitelistDomains,
      whitelistDomainsToUpdate: application.whitelistDomains.map(
        (whitelistDomain) => whitelistDomain.hostname,
      ),
    });

  const validator = async (data: string[]) => {
    let hasInvalidHostname = false;

    for (const hostname of data) {
      if (!isHostnameValid({ hostname })) {
        hasInvalidHostname = true;
        output.warn(t('invalidHostname', { hostname }));
      }
    }

    // If error messages displayed
    // show a new line to make it easier to read
    if (hasInvalidHostname) {
      output.printNewLine();
    }

    return !hasInvalidHostname;
  };

  const whitelistDomains = await promptUntil({
    handler,
    validator,
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
