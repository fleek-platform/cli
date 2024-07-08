import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

export const listPrivateGatewaysAction: SdkGuardedFunction<
  Record<string, never>
> = async ({ sdk }) => {
  const privateGateways = await sdk.privateGateways().list();

  if (privateGateways.length === 0) {
    output.log(t('noPrivateGateways'));

    return;
  }

  output.table(
    privateGateways.map(({ id, slug, name, createdAt }) => ({
      ID: id,
      Slug: slug,
      Name: name,
      'Created At': createdAt,
    })),
  );
};

export const listPrivateGatewaysActionHandler = withGuards(
  listPrivateGatewaysAction,
  {
    scopes: { authenticated: true, project: true, site: false },
  },
);
