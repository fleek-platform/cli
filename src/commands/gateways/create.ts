import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { createDomainAction } from '../domains/create';
import { waitForZoneCreationResult } from '../domains/wait/waitForZoneCreationResult';
import { getPrivateGatewayNameOrPrompt } from './prompts/getPrivateGatewayNameOrPrompt';

export type CreatePrivateGatewayActionArgs = {
  name?: string;
};

export const createPrivateGatewayAction: SdkGuardedFunction<
  CreatePrivateGatewayActionArgs
> = async ({ sdk, args }) => {
  const name = await getPrivateGatewayNameOrPrompt({ name: args.name });

  output.spinner(`${t('creatingNewGateway')}...`);

  const zone = await sdk.domains().createZoneForPrivateGateway();

  const zoneCreationResult = await waitForZoneCreationResult({ sdk, zone });

  if (zoneCreationResult !== 'CREATED') {
    output.error(t('gatewayNotCreated'));
    output.printNewLine();

    return;
  }

  const privateGateway = await sdk
    .privateGateways()
    .create({ name, zoneId: zone.id });

  output.printNewLine();
  output.success(
    t('commonNameCreateSuccess', { name: `${t('privateGateway')} "${name}"` }),
  );
  output.printNewLine();

  await createDomainAction({
    sdk,
    args: { privateGatewayId: privateGateway.id },
  });
};

export const createPrivateGatewayActionHandler = withGuards(
  createPrivateGatewayAction,
  {
    scopes: { authenticated: true, project: true, site: false },
  },
);
