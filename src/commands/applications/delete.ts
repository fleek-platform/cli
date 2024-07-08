import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getApplicationOrPrompt } from './prompts/getApplicationOrPrompt';

type DeleteApplicationArgs = {
  id?: string;
};

const deleteApplicationAction: SdkGuardedFunction<
  DeleteApplicationArgs
> = async ({ sdk, args }) => {
  const application = await getApplicationOrPrompt({ id: args.id, sdk });

  if (!application) {
    output.error(t('expectedNotFoundGeneric', { name: 'application' }));

    return;
  }

  await sdk.applications().delete({ id: application.id });

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: t('clientId'),
      action: t('deleted'),
    }),
  );
};

export const deleteApplicationActionHandler = withGuards(
  deleteApplicationAction,
  {
    scopes: { authenticated: true, project: true, site: false },
  },
);
