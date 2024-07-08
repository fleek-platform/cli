import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getPrivateGatewayOrPrompt } from './prompts/getPrivateGatewayOrPrompt';

type DeletePrivateGatewayActionArgs = {
  id?: string;
  slug?: string;
};

export const deletePrivateGatewayAction: SdkGuardedFunction<
  DeletePrivateGatewayActionArgs
> = async ({ sdk, args }) => {
  const privateGateway = await getPrivateGatewayOrPrompt({
    sdk,
    id: args.id,
    slug: args.slug,
  });

  if (!privateGateway) {
    output.error(t('noPrivateGatewaysFoundUnexpectedly'));

    return;
  }

  output.spinner(t('deletingGateway'));

  await sdk.privateGateways().delete({ id: privateGateway.id });

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: `${t('privateGateway')} "${privateGateway.name}"`,
      action: t('deleted'),
    }),
  );
};

export const deletePrivateGatewayActionHandler = withGuards(
  deletePrivateGatewayAction,
  {
    scopes: { authenticated: true, project: true, site: false },
  },
);
