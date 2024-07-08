import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
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

  const whitelistDomains = isNonInteractive
    ? whitelistArgParser(args.whitelistDomains)
    : await getWhitelistDomainsOrPrompt({
        whitelistDomains: args.whitelistDomains,
      });

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
