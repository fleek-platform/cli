import type { Domain, DomainStatus, FleekSdk } from '@fleek-platform/sdk/node';

type DomainFilter = {
  status?: DomainStatus;
  isVerified?: boolean;
};
type GetAllPrivateGatewayDomainsArgs = {
  sdk: FleekSdk;
  filter?: DomainFilter;
};

type GetAllActivePrivateGatewayDomainsArgs = Pick<
  GetAllPrivateGatewayDomainsArgs,
  'sdk'
>;

export const getAllPrivateGatewayDomains = async ({
  sdk,
  filter,
}: GetAllPrivateGatewayDomainsArgs): Promise<Domain[]> => {
  const privateGateways = await sdk.privateGateways().list();

  if (privateGateways.length === 0) {
    return [];
  }

  const domainPromises = privateGateways.map(async (privateGateway) => {
    const zoneId = privateGateway.zone?.id;

    if (!zoneId) return [];

    return sdk.domains().listByZoneId({ zoneId });
  });

  const domains = (await Promise.all(domainPromises)).flat();

  return filter && Object.keys(filter).length > 0
    ? domains.filter((domain: Domain) =>
        Object.entries(filter).every(([key, value]) => {
          return domain[key as keyof Domain] === value;
        }),
      )
    : domains;
};

export const getAllActivePrivateGatewayDomains = async ({
  sdk,
}: GetAllActivePrivateGatewayDomainsArgs): Promise<Domain[]> => {
  return await getAllPrivateGatewayDomains({
    sdk,
    filter: { status: 'ACTIVE' },
  });
};
