import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { usePressAnyKey } from '../../utils/pressAnyKey';
import { t } from '../../utils/translation';
import { getSiteOrPrompt } from '../sites/prompts/getSiteOrPrompt';
import { getEnsNameOrPrompt } from './prompts/getEnsNameOrPrompt';
import { getIpnsRecordOrPrompt } from './prompts/getIpnsRecordOrPrompt';
import { waitForEnsRecordCreationResult } from './wait/waitForEnsRecordCreationResult';
import { waitForEnsRecordVerificationResult } from './wait/waitForEnsRecordVerificationResult';

export type CreateEnsActionArgs = {
  siteId?: string;
  siteSlug?: string;
  name?: string;
  ipns?: string;
};

export const createEnsAction: SdkGuardedFunction<CreateEnsActionArgs> = async ({
  sdk,
  args,
}) => {
  const site = await getSiteOrPrompt({
    id: args.siteId,
    slug: args.siteSlug,
    sdk,
  });

  if (!site) {
    output.error(t('expectedNotFoundGeneric', { name: 'site' }));

    return;
  }

  const ipnsRecord = await getIpnsRecordOrPrompt({
    name: args.ipns,
    sdk,
    siteId: site.id,
  });

  if (!ipnsRecord) {
    output.error(t('noDomainsFoundUnexpectedly'));

    return;
  }

  const ensName = await getEnsNameOrPrompt({ name: args.name });

  output.spinner(t('ensCreatingForSelectSite'));

  const ensRecord = await sdk
    .ens()
    .create({ name: ensName, siteId: site.id, ipnsRecordId: ipnsRecord.id });

  const ensCreationStatus = await waitForEnsRecordCreationResult({
    sdk,
    id: ensRecord.id,
  });

  if (ensCreationStatus === null) {
    output.warn(
      t('warnSubjectProcessIsLong', {
        subject: t('processOfObtainHashForENS'),
      }),
    );

    output.printNewLine();

    output.log(
      `${t('commonWaitAndCheckStatusViaCmd', { subject: t('ensConf') })}`,
    );
    output.log(output.textColor(`fleek ens detail ${ensName}`, 'cyan'));

    return;
  }

  output.printNewLine();
  output.success(t('commonNameCreateSuccess', { name: `ENS "${ensName}"` }));
  output.printNewLine();
  output.hint(t('ensFollowLinkUpdateRec', { ipnsRecordName: ipnsRecord.name }));
  output.link(`https://app.ens.domains/${ensName}?tab=records`);
  output.printNewLine();

  const { waitForAnyKey } = usePressAnyKey();

  while (true) {
    output.log(t('ensPressAnyKeyOnceENSConfig'));
    await waitForAnyKey();
    output.spinner(t('ensVerifying'));

    await sdk.ens().verify({ id: ensRecord.id });

    const verificationResultStatus = await waitForEnsRecordVerificationResult({
      id: ensRecord.id,
      sdk,
    });

    if (!verificationResultStatus) {
      output.warn(
        t('warnSubjectProcessIsLong', {
          subject: t('processOfENSVerification'),
        }),
      );
      output.printNewLine();

      output.log(
        `${t('commonWaitAndCheckStatusViaCmd', { subject: t('ensConf') })}`,
      );
      output.log(output.textColor(`fleek ens detail ${ensName}`, 'cyan'));

      return;
    }

    if (verificationResultStatus === 'ACTIVE') {
      output.success(t('ensVerified', { ensName }));
      output.printNewLine();

      return;
    }

    output.error(t('ensCouldNotVerifyCheckURL', { ensRecordName: ensName }));
    output.printNewLine();
  }
};

export const createEnsActionHandler = withGuards(createEnsAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
