import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';

type ListDeploymentActionArgs = {
  name?: string;
};

const listDeploymentsAction: SdkGuardedFunction<
  ListDeploymentActionArgs
> = async ({ sdk, args }) => {
  const functionToList = await getFunctionOrPrompt({ sdk, name: args.name });

  if (!functionToList) {
    output.error(t('expectedNotFoundGeneric', { name: 'function' }));

    return;
  }

  const deployments = await sdk
    .functions()
    .listDeployments({ functionId: functionToList.id });

  if (!deployments?.length) {
    output.warn(t('noYYet', { name: 'deployments' }));
    output.log(t('youCanDoXUsingFolCmd', { action: t('deployNewFunction') }));
    output.log('fleek functions deploy');

    return;
  }

  output.table(
    deployments.map((d) => ({
      ID: d.id,
      CID: d.cid,
      'Created At': d.createdAt,
    })),
  );
};

export const listDeploymentsActionHandler = withGuards(listDeploymentsAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
