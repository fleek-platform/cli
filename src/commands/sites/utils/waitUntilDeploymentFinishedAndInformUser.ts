import type { FleekSdk } from '@fleek-platform/sdk';
import { getFleekDefaultGatewayBySlug } from '@fleek-platform/utils-gateways';

import type { Output } from '../../../output/Output';
import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';
import { t } from '../../../utils/translation';
import { returnDeploymentWhenFinished } from './returnDeploymentWhenFinished';

type WaitUntilDeploymentFinishedAndInformUserArgs = {
  sdk: FleekSdk;
  deploymentId: string;
  siteId: string;
  slug: string;
  hostname?: string;
  hash: string;
  output: Output;
};

export const waitUntilDeploymentFinishedAndInformUser = async ({
  sdk,
  siteId,
  slug,
  hostname,
  deploymentId,
  hash,
  output,
}: WaitUntilDeploymentFinishedAndInformUserArgs) => {
  const deploymentStatus = await checkPeriodicallyUntil({
    conditionFn: returnDeploymentWhenFinished({ sdk, deploymentId }),
    period: 6_000,
    tries: 30,
  });

  if (!deploymentStatus) {
    output.warn(
      t('warnSubjectProcessIsLong', { subject: t('processOfDeployment') }),
    );
    output.printNewLine();

    output.log(
      `${t('commonWaitAndCheckStatusViaCmd', { subject: t('deploymentStatus') })}`,
    );
    output.log(
      output.textColor(`fleek sites deployments --id ${siteId}`, 'cyan'),
    );

    return;
  }

  if (deploymentStatus === 'RELEASE_FAILED') {
    output.error(t('deployNotFinishTryAgain'));
    output.printNewLine();

    return;
  }

  output.success(`${t('deployed')}!`);
  output.printNewLine();
  output.log(t('siteIPFSCid', { hash }));

  output.hint(`${t('visitViaGateway')}:`);
  output.link(
    hostname ? `https://${hostname}` : getFleekDefaultGatewayBySlug({ slug }),
  );
};
