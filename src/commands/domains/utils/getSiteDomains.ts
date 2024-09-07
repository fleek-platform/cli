import type { Domain, FleekSdk } from '@fleek-platform/sdk/node';

type GetSiteDomainsArgs = {
  sdk: FleekSdk;
  siteId: string;
};

// TODO: [graphql] Add field to site with list of domains and replace in CLI #682
export const getSiteDomains = async ({
  sdk,
  siteId,
}: GetSiteDomainsArgs): Promise<Domain[]> => {
  const site = await sdk.sites().get({ id: siteId });

  const domainsGroupedByZones = await Promise.all(
    site.zones.map((zone) => sdk.domains().listByZoneId({ zoneId: zone.id })),
  );

  return domainsGroupedByZones.flat();
};
