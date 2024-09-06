import type { FleekSdk, PrivateGateway, Site } from '@fleek-platform/sdk/node';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';
import { getPrivateGatewayOrPrompt } from '../../gateways/prompts/getPrivateGatewayOrPrompt';
import { getSiteOrPrompt } from '../../sites/prompts/getSiteOrPrompt';

type GetSiteOrPrivateGatewayArgs = {
  sdk: FleekSdk;
  privateGatewayId?: string;
  privateGatewaySlug?: string;
  siteId?: string;
  siteSlug?: string;
};

export const getSiteOrPrivateGateway = async ({
  sdk,
  privateGatewayId,
  privateGatewaySlug,
  siteId,
  siteSlug,
}: GetSiteOrPrivateGatewayArgs): Promise<
  Partial<Record<'site' | 'privateGateway', Site | PrivateGateway>>
> => {
  const { upperFirst } = await import('lodash-es');

  const zoneType =
    !privateGatewayId && !privateGatewaySlug && !siteId && !siteSlug
      ? await selectPrompt({
          message: `${t('selectDomainPurpose')}:`,
          choices: [
            { title: upperFirst(t('site')), value: 'SITE' },
            { title: t('privateGateway'), value: 'PRIVATE_GATEWAY' },
          ],
        })
      : null;

  if (
    privateGatewayId ||
    privateGatewaySlug ||
    zoneType === 'PRIVATE_GATEWAY'
  ) {
    const privateGateway = await getPrivateGatewayOrPrompt({
      id: privateGatewayId,
      slug: privateGatewaySlug,
      sdk,
    });

    return { privateGateway };
  }

  const site = await getSiteOrPrompt({ id: siteId, slug: siteSlug, sdk });

  return { site };
};
