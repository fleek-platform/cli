import { isHostnameValid } from '@fleek-platform/utils-validation';
import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { promptUntil } from '../../utils/prompts/promptUntil';
import { t } from '../../utils/translation';
import { enterApplicationNameOrPrompt } from './prompts/enterApplicationNameOrPrompt';
import { getWhitelistDomainsOrPrompt } from './prompts/getWhitelistDomainsOrPrompt';

type CreateApplicationActionArgs = {
  name?: string;
  whitelistDomains?: string[];
};

type Whitelist = string[];

export const whitelistArgParser = (listArg: string[] | undefined) => {
  try {
    if (!Array.isArray(listArg)) {
      // eslint-disable-next-line fleek-custom/no-default-error
      throw new Error(t('unexpectedArg'));
    }

    return listArg[0].split(',').reduce((acc: string[], curr: string) => {
      acc.push(curr.trim());
      return acc;
    }, [] as Whitelist);
  } catch (err) {
    if (err instanceof Error) {
      output.error(err.message);

      return;
    }

    // eslint-disable-next-line fleek-custom/no-default-error
    throw Error(t('unexpectedError'));
  }
};

export const createApplicationAction: SdkGuardedFunction<
  CreateApplicationActionArgs
> = async ({ sdk, args }) => {
  const isNonInteractive = !!Object.keys(args).length;

  const name = isNonInteractive
    ? args.name
    : await enterApplicationNameOrPrompt({ name: args.name });

  let whitelistDomains: string[] | undefined;

  if (isNonInteractive) {
    whitelistDomains = whitelistArgParser(args.whitelistDomains);
  } else {
    const handler = async () =>
      getWhitelistDomainsOrPrompt({
        whitelistDomains: args.whitelistDomains,
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

    whitelistDomains = await promptUntil({
      handler,
      validator,
    });
  }

  if (!name || !whitelistDomains) {
    output.error(t('unexpectedError'));

    return;
  }

  // Warning: The whiteLabelDomains is deprecated and due to
  // retroactive support requirements, the SDK applications create
  // copies the data over from the new field to old. So, its not
  // required to pass whiteLabelDomains here.
  const { clientId } = await sdk
    .applications()
    .create({ name, whitelistDomains });

  output.printNewLine();
  output.success(t('appCreateSuccessClientId', { clientId }));
  output.printNewLine();
};

export const createApplicationActionHandler = withGuards(
  createApplicationAction,
  {
    scopes: { authenticated: true, project: true, site: false },
  },
);
