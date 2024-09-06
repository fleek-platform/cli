import type { FleekSdk } from '@fleek-platform/sdk/node';

type ReturnDeploymentWhenFinishedArgs = {
  sdk: FleekSdk;
  deploymentId: string;
};

export const returnDeploymentWhenFinished =
  ({ sdk, deploymentId }: ReturnDeploymentWhenFinishedArgs) =>
  async () => {
    const deployment = await sdk.sites().getDeployment({ id: deploymentId });

    if (
      deployment.status === 'RELEASE_COMPLETED' ||
      deployment.status === 'RELEASE_FAILED'
    ) {
      return deployment.status;
    }

    return null;
  };
