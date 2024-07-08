import { PrivateGatewaysNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk } from '@fleek-platform/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetPrivateGatewayOrPromptArgs = {
  id?: string;
  slug?: string;
  sdk: FleekSdk;
};

export const getPrivateGatewayOrPrompt = async ({
  id,
  slug,
  sdk,
}: GetPrivateGatewayOrPromptArgs) => {
  if (id) {
    return sdk.privateGateways().get({ id });
  }

  if (slug) {
    return sdk.privateGateways().getBySlug({ slug });
  }

  const privateGateways = await sdk.privateGateways().list();

  if (privateGateways.length === 0) {
    throw new PrivateGatewaysNotFoundError({});
  }

  const selectedPrivateGatewayId = await selectPrompt({
    message: `${t('commonSelectXFromList', { subject: t('privateGateway') })}:`,
    choices: privateGateways.map((privateGateway) => ({
      title: `${privateGateway.name} (${privateGateway.slug})`,
      value: privateGateway.id,
    })),
  });

  const matchPrivateGw = privateGateways.find(
    (privateGateway) => privateGateway.id === selectedPrivateGatewayId,
  );

  if (!matchPrivateGw) return;

  return matchPrivateGw;
};
