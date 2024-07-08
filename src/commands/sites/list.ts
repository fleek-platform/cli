import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

const listAction: SdkGuardedFunction = async ({ sdk }) => {
  const sites = await sdk.sites().list();

  if (!sites?.length) {
    output.warn(t('noSitesYet'));
    output.log(t('youCanDoXUsingFolCmd', { action: t('createNewSite') }));
    output.log('fleek sites init');

    return;
  }

  output.table(
    sites.map((site) => ({
      Name: site.name,
      Slug: site.slug,
      ID: site.id,
    })),
  );
};

export const listActionHandler = withGuards(listAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
