import type {
  ApplicationWhiteLabelDomain,
  ApplicationWhitelistDomain,
} from '@fleek-platform/sdk';

type WhitelistDomain = Omit<
  ApplicationWhitelistDomain,
  'createdAt' | 'updatedAt' | '__typename'
>;
type WhiteLabelDomain = Omit<
  ApplicationWhiteLabelDomain,
  'createdAt' | 'updatedAt' | '__typename'
>;

export const parseWhitelistDomains = ({
  whitelistDomains,
  whiteLabelDomains,
}: {
  whitelistDomains: WhitelistDomain[];
  whiteLabelDomains: WhiteLabelDomain[];
}) => {
  const combinedWhitelistDomains = [
    ...whitelistDomains.map((whitelistDomain) => whitelistDomain.hostname),
    ...whiteLabelDomains.map((whiteLabelDomain) => whiteLabelDomain.hostname),
  ];
  const uniqueWhitelistDomains = Array.from(
    new Set(combinedWhitelistDomains),
  ).map((uniqueWhitelistDomain) => ({
    hostname: uniqueWhitelistDomain,
  }));

  return uniqueWhitelistDomains;
};
