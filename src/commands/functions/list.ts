import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

const listAction: SdkGuardedFunction = async ({ sdk }) => {
  const functions = await sdk.functions().list();

  if (!functions?.length) {
    output.warn(t('noYYet', { name: 'functions' }));
    output.log(t('youCanDoXUsingFolCmd', { action: t('createNewFunction') }));
    output.log('fleek functions create');

    return;
  }

  output.table(
    functions.map((f) => ({
      ID: f.id,
      Name: f.name,
      Slug: f.slug,
      InvokeUrl: f.invokeUrl,
      Status: f.status,
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
