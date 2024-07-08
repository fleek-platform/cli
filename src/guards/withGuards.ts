import { output } from '../cli';
import { t } from '../utils/translation';
import { loginGuard } from './loginGuard';
import { projectGuard } from './projectGuard';
import { sdkGuard } from './sdkGuard';
import { sitesGuard } from './sitesGuard';
import type { Action, Guards, SdkGuardedFunction } from './types';

type WithGuardsArgs = { scopes: Guards };

export const withGuards = <
  T extends {
    predefinedConfigPath?: string;
    [name: string]: string | string[] | boolean | undefined;
  },
>(
  handler: SdkGuardedFunction<T>,
  { scopes }: WithGuardsArgs,
): Action<T> => {
  return async (args: T = {} as T) => {
    if (scopes.authenticated) {
      await loginGuard();
    }

    if (scopes.project) {
      await projectGuard();
    }

    if (scopes.site) {
      await sitesGuard(args);
    }

    try {
      const action = sdkGuard(handler);
      await action(args);
    } catch (error) {
      if (error instanceof Error) {
        output.error(error?.message);
        return;
      }

      output.error(`${t('unexpectedError')} ${JSON.stringify(error)}`);
    }
  };
};
