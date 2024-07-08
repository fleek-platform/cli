import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { usePressAnyKey } from '../../utils/pressAnyKey';
import { t } from '../../utils/translation';
import { getHostnameOrPrompt } from './prompts/getHostnameOrPrompt';
import { getSiteOrPrivateGateway } from './prompts/getSiteOrPrivateGateway';
import {
  type GetZoneForSiteOrPrivateGatewayArgs,
  getZoneForSiteOrPrivateGateway,
} from './utils/getZoneForSiteOrPrivateGateway';
import { waitForDomainCreationResult } from './wait/waitForDomainCreationResult';
import { waitForDomainVerificationResult } from './wait/waitForDomainVerificationResult';

export type CreateDomainActionArgs = {
  privateGatewayId?: string;
  privateGatewaySlug?: string;
  siteId?: string;
  siteSlug?: string;
  hostname?: string;
};

export const createDomainAction: SdkGuardedFunction<
  CreateDomainActionArgs
> = async ({ sdk, args }) => {
  const { site, privateGateway } = await getSiteOrPrivateGateway({
    sdk,
    privateGatewayId: args.privateGatewayId,
    privateGatewaySlug: args.privateGatewaySlug,
    siteId: args.siteId,
    siteSlug: args.siteSlug,
  });

  const hostname = await getHostnameOrPrompt({ hostname: args.hostname });

  if (site) {
    output.spinner(t('creatingNewDomainSite'));
  } else {
    output.spinner(t('creatingNewDomainGw'));
  }

  // TODO: Investigate the diff with org repo
  // const zone = await getZoneForSiteOrPrivateGateway(
  //   site ? ({ site, sdk } as GetZoneForSiteOrPrivateGatewayArgs) : ({ privateGateway, sdk } as GetZoneForSiteOrPrivateGatewayArgs)
  // );

  // TODO: Check commented out above
  const zone = await getZoneForSiteOrPrivateGateway(
    site
      ? ({ site, sdk } as unknown as GetZoneForSiteOrPrivateGatewayArgs)
      : ({
          privateGateway,
          sdk,
        } as unknown as GetZoneForSiteOrPrivateGatewayArgs),
  );

  if (zone === null) {
    output.error(t('createDomainFailure'));
    output.printNewLine();

    return;
  }

  await sdk.domains().createDomain({ zoneId: zone.id, hostname });

  const domainCreationStatus = await waitForDomainCreationResult({
    sdk,
    hostname: hostname,
  });

  if (domainCreationStatus === null) {
    output.warn(
      t('warnSubjectProcessIsLong', { subject: t('dnsConfiguration') }),
    );
    output.printNewLine();

    output.log(
      `${t('commonWaitAndCheckStatusViaCmd', { subject: t('dnsConfiguration') })}:`,
    );
    output.log(output.textColor(`fleek domains detail ${hostname}`, 'cyan'));

    return;
  }

  if (domainCreationStatus === 'CREATING_FAILED') {
    output.error(t('createDomainFailure'));
    output.printNewLine();

    return;
  }

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: `${t('domain')} ${output.quoted(hostname)}`,
      action: t('created'),
    }),
  );
  output.printNewLine();

  const domain = await sdk.domains().getByHostname({ hostname: hostname });

  output.log(`${t('updateDNSRecords', { hostname })}:`);
  for (const { type, value } of domain.dnsConfigs) {
    if (type === 'CNAME') {
      output.log(`CNAME @ ${value.toLowerCase().replace('https://', '')}`);
    }
  }

  output.printNewLine();

  const { waitForAnyKey } = usePressAnyKey();

  while (true) {
    output.hint(
      t('commonPressAnyKeyOnceConfig', { subject: t('dnsSettings') }),
    );
    await waitForAnyKey();
    output.spinner(t('commonVerifyingSubject', { subject: t('dnsSettings') }));

    await sdk.domains().verifyDomain({ domainId: domain.id });

    const verificationResultStatus = await waitForDomainVerificationResult({
      domain,
      sdk,
    });

    if (!verificationResultStatus) {
      output.warn(
        t('warnSubjectProcessIsLong', { subject: t('dnsConfiguration') }),
      );
      output.printNewLine();

      output.log(
        `${t('commonWaitAndCheckStatusViaCmd', { subject: t('dnsConfiguration') })}:`,
      );
      output.log(output.textColor(`fleek domains detail ${hostname}`, 'cyan'));

      return;
    }

    if (verificationResultStatus === 'ACTIVE') {
      output.printNewLine();
      output.success(`Domain ${output.quoted(hostname)} was verified.`);
      output.printNewLine();

      return;
    }

    output.error(t('domainVerificationFailureCheckDns', { hostname }));
    output.printNewLine();
  }
};

export const createDomainActionHandler = withGuards(createDomainAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
