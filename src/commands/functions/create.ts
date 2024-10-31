import { SiteNotFoundError } from '@fleek-platform/errors';
import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionNameOrPrompt } from './prompts/getFunctionNameOrPrompt';
import { isSiteIdValid } from './utils/isSiteIdValid';

type CreateFunctionArgs = {
  name?: string;
  siteId?: string;
};

const createAction: SdkGuardedFunction<CreateFunctionArgs> = async ({
  args,
  sdk,
}) => {
  const { name, siteId } = args;
  const functionName = await getFunctionNameOrPrompt({ name });

  if (!siteId || !(await isSiteIdValid({ siteId, sdk }))) {
    output.error(t('siteNotFound'));
    return;
  }

  const newFunction = await sdk.functions().create({
    name: functionName,
    siteId: siteId as string,
  });

  output.printNewLine();
  output.success(t('commonNameCreateSuccess', { name: 'function' }));
  output.printNewLine();

  if (!newFunction.currentDeploymentId) {
    output.log(t('youCanDoXUsingFolCmd', { action: t('deployNewFunction') }));
    output.log('fleek functions deploy');
  }
};

export const createActionHandler = withGuards(createAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
