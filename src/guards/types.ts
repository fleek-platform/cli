import type { FleekSdk } from '@fleek-platform/sdk/node';

type NoArgumentsType = never;

export type SdkGuardedFunctionArgs<T = NoArgumentsType> = {
  sdk: FleekSdk;
  args: T;
};

export type SdkGuardedFunction<T = NoArgumentsType> = (
  guardedArgs: SdkGuardedFunctionArgs<T>,
) => Promise<void>;

export type Action<T = NoArgumentsType> = (args?: T) => Promise<void> | void;

export type Guards = {
  authenticated: true;
  project: boolean;
  site: boolean;
};
