import type { FleekSdk } from '@fleek-platform/sdk/node';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { enterSiteNamePrompt } from '../prompts/enterSiteNamePrompt';

type CreateSiteArgs = { sdk: FleekSdk };

export const createSite = async ({ sdk }: CreateSiteArgs) => {
  const name = await enterSiteNamePrompt();

  output.spinner(`${t('creatingSite')}...`);
  const site = await sdk.sites().create({ name });
  output.printNewLine();
  output.success(
    t('commonNameCreateSuccess', { name: `${t('site')} "${name}"` }),
  );
  output.printNewLine();

  return site;
};
