import type { Domain } from '@fleek-platform/sdk';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getDomainOrPrompt } from './prompts/getDomainOrPrompt';
import { waitForDomainVerificationResult } from './wait/waitForDomainVerificationResult';

export type VerifyDomainActionArgs = {
  id?: string;
  hostname?: string;
};

export const verifyDomainAction: SdkGuardedFunction<
  VerifyDomainActionArgs
> = async ({ sdk, args }) => {
  const domain = await getDomainOrPrompt({
    id: args.id,
    hostname: args.hostname,
    sdk,
    choicesFilter: (domain: Domain) => domain.isVerified,
  });

  if (!domain) {
    output.error(t('noEnsRecordFoundUnexpectedly'));
    return;
  }

  if (domain.status === 'ACTIVE') {
    output.success(t('domainAlreadyVerified', { hostname: domain.hostname }));
    output.printNewLine();

    return;
  }

  output.spinner(t('verifyingDomain'));

  await sdk.domains().verifyDomain({ domainId: domain.id });

  const verificationResultStatus = await waitForDomainVerificationResult({
    domain,
    sdk,
  });

  if (!verificationResultStatus) {
    output.warn(
      t('warnSubjectProcessIsLong', {
        subject: t('processOfDomainVerification'),
      }),
    );
    output.printNewLine();

    output.log(
      `${t('commonWaitAndCheckStatusViaCmd', { subject: t('deploymentStatus') })}`,
    );
    output.log(
      output.textColor(`fleek domains detail ${domain.hostname}`, 'cyan'),
    );

    return;
  }

  if (verificationResultStatus === 'VERIFYING_FAILED') {
    output.printNewLine();
    output.error(
      t('domainVerificationFailureCheckDns', { hostname: domain.hostname }),
    );
    output.printNewLine();

    return;
  }

  output.success(t('domainVerified', { hostname: domain.hostname }));
  output.printNewLine();
};

export const verifyDomainActionHandler = withGuards(verifyDomainAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
