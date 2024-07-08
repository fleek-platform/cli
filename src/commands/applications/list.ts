import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { parseWhitelistDomains } from './utils/parser';
import { truncateAndJoinStrings } from './utils/truncateAndJoinStrings';

export const listApplicationsAction: SdkGuardedFunction<
  Record<string, never>
> = async ({ sdk }) => {
  const applications = await sdk.applications().list();

  if (applications.length === 0) {
    output.log(t('noYYet', { name: `${t('sdkPoweredApp')} ${t('clientId')}` }));

    return;
  }

  output.table(
    applications.map(
      ({
        id,
        name,
        clientId,
        whitelistDomains,
        whiteLabelDomains,
        createdAt,
      }) => {
        // Warning: The WhiteLableDomains is deprecated
        // the parser here combines the new field with old
        // to avoid missing any state provoked by data pushed
        // by old clients e.g. cli 0.7.3
        const uniqueWhitelistDomains = parseWhitelistDomains({
          whiteLabelDomains,
          whitelistDomains,
        });

        return {
          ID: id,
          Name: name,
          'Client ID': clientId,
          'White list domains': truncateAndJoinStrings({
            input: uniqueWhitelistDomains.map(
              (whitelistDomain) => whitelistDomain.hostname,
            ),
            truncateOnPosition: 3,
          }),
          'Created At': createdAt,
        };
      },
    ),
  );
};

export const listApplicationsActionHandler = withGuards(
  listApplicationsAction,
  {
    scopes: {
      authenticated: true,
      project: true,
      site: false,
    },
  },
);
