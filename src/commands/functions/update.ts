import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionNameOrPrompt } from './prompts/getFunctionNameOrPrompt';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';
import { getFunctionSlugOrPrompt } from './prompts/getFunctionSlugOrPrompt';
import { getFunctionStatusOrPrompt } from './prompts/getFunctionStatusOrPrompt';

type UpdateFunctionArgs = {
  functionName?: string;
  name?: string;
  slug?: string;
  status?: string;
};

const updateAction: SdkGuardedFunction<UpdateFunctionArgs> = async ({
  args,
  sdk,
}) => {
  if (!args.name && !args.slug && !args.status) {
    output.error(
      t('functionUpdateArgsNotValid', {
        param1: 'name',
        param2: 'slug',
        param3: 'status',
      }),
    );

    return;
  }

  const name = args.name
    ? await getFunctionNameOrPrompt({ name: args.name })
    : undefined;
  const slug = args.slug
    ? await getFunctionSlugOrPrompt({ slug: args.slug })
    : undefined;
  const status = args.status
    ? await getFunctionStatusOrPrompt({ status: args.status })
    : undefined;

  const fleekFunction = await getFunctionOrPrompt({
    name: args.functionName,
    sdk,
  });

  if (!fleekFunction) {
    output.error(t('expectedNotFoundGeneric', { name: 'function' }));

    return;
  }

  await sdk.functions().update({ id: fleekFunction.id, slug, status, name });

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: t('function'),
      action: t('updated'),
    }),
  );
  output.printNewLine();
};

export const updateActionHandler = withGuards(updateAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
