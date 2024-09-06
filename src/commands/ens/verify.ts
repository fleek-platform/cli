import type { EnsRecord } from '@fleek-platform/sdk/node';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getEnsRecordOrPrompt } from './prompts/getEnsRecordOrPrompt';
import { waitForEnsRecordVerificationResult } from './wait/waitForEnsRecordVerificationResult';

export type VerifyEnsActionArgs = {
  id?: string;
  name?: string;
};

export const verifyEnsRecordAction: SdkGuardedFunction<
  VerifyEnsActionArgs
> = async ({ sdk, args }) => {
  const ensRecord = await getEnsRecordOrPrompt({
    id: args.id,
    name: args.name,
    sdk,
    choicesFilter: (ens: EnsRecord) => ens.status !== 'ACTIVE',
  });

  if (!ensRecord) {
    output.error(t('noEnsRecordFoundUnexpectedly'));

    return;
  }

  if (ensRecord.status === 'ACTIVE') {
    output.success(
      t('ensRecordNameAlreadyVerif', { ensRecordName: ensRecord.name }),
    );
    output.printNewLine();

    return;
  }

  output.spinner(t('ensVerifying'));

  await sdk.ens().verify({ id: ensRecord.id });

  const verificationResultStatus = await waitForEnsRecordVerificationResult({
    id: ensRecord.id,
    sdk,
  });

  if (!verificationResultStatus) {
    output.warn(
      t('warnSubjectProcessIsLong', { subject: t('processOfENSVerification') }),
    );
    output.printNewLine();

    output.log(
      `${t('commonWaitAndCheckStatusViaCmd', { subject: t('ensConf') })}:`,
    );
    output.log(output.textColor(`fleek ens detail ${ensRecord.name}`, 'cyan'));

    return;
  }

  if (verificationResultStatus === 'VERIFYING_FAILED') {
    output.error(
      t('ensCouldNotVerifyCheckURL', { ensRecordName: ensRecord.name }),
    );
    output.printNewLine();

    return;
  }

  output.success(t('ensNameVerified', { ensRecordName: ensRecord.name }));
  output.printNewLine();
};

export const verifyEnsRecordActionHandler = withGuards(verifyEnsRecordAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
