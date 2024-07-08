import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getDomainOrPrompt } from './prompts/getDomainOrPrompt';
import { waitUntilDomainDeleted } from './wait/waitUntilDomainDeleted';

export type DeleteDomainActionArgs = {
  id?: string;
  hostname?: string;
};

export const deleteDomainAction: SdkGuardedFunction<
  DeleteDomainActionArgs
> = async ({ sdk, args }) => {
  const domain = await getDomainOrPrompt({
    id: args.id,
    hostname: args.hostname,
    sdk,
  });

  if (!domain) {
    output.error(t('expectedNotFoundGeneric', { name: 'domain' }));

    return;
  }

  output.spinner(t('deletingDomain'));

  await sdk.domains().deleteDomain({ domainId: domain.id });

  const isDeleted = await waitUntilDomainDeleted({ sdk, domain });

  if (!isDeleted) {
    output.error(t('cannotDeleteDomain', { hostname: domain.hostname }));
    output.printNewLine();

    return;
  }

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: `${t('domain')} "${domain.hostname}"`,
      action: 'deleted',
    }),
  );
  output.printNewLine();
};

export const deleteDomainActionHandler = withGuards(deleteDomainAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
