import type { Deployment } from '@fleek-platform/sdk/node';

import type { Output } from '../../../output/Output';
import { t } from '../../../utils/translation';

type PrintDeploymentsTableArgs = {
  output: Output;
  deployments: Deployment[];
};

export const printDeploymentsTable = ({
  output,
  deployments,
}: PrintDeploymentsTableArgs) => {
  if (deployments.length === 0) {
    output.warn(
      t('noYForXYet', { name: t('deployments'), subject: t('site') }),
    );

    return;
  }

  output.table(
    deployments.map(({ id, createdAt, updatedAt, status, cid }) => ({
      ID: id,
      'Created At': createdAt,
      'Updated At': updatedAt,
      Status: status,
      CID: cid,
    })),
  );
};
