import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getFunctionNameOrPrompt } from './prompts/getFunctionNameOrPrompt';

type CreateFunctionArgs = {
  name?: string;
};

const createAction: SdkGuardedFunction<CreateFunctionArgs> = async ({
  args,
  sdk,
}) => {
  const functionName = await getFunctionNameOrPrompt({ name: args.name });

  const newFunction = await sdk.functions().create({ name: functionName });

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
