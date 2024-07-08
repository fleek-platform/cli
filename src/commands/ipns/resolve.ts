import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

type ResolveActionArgs = {
  name: string;
};

const resolveAction: SdkGuardedFunction<ResolveActionArgs> = async ({
  sdk,
  args,
}) => {
  const res = await sdk.ipns().resolveName({ name: args.name });
  const hash = res.replace('/ipfs/', '');

  output.success(t('ipnsResultHashIs', { hash }));
  output.printNewLine();
};

export const resolveActionHandler = withGuards(resolveAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
