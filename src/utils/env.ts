import { EnvNotSetError } from '@fleek-platform/errors';

// Replace global variables with specific values during build
const DEFAULT_ESBUILD_DEFINED_PROCESS_ENV_PREFIX = 'process.env.';

type Optional<T = void> = Partial<Record<keyof T, string | undefined | null>>;

export const parseEnvVarsAsKeyVal = <T extends Record<string, string>>({
  defined,
  keyPrefix = DEFAULT_ESBUILD_DEFINED_PROCESS_ENV_PREFIX,
}: {
  defined: Optional<T>;
  keyPrefix?: string;
}) => {
  const keys = Object.keys(defined);

  if (!keys.length) {
    throw new EnvNotSetError('');
  }

  return keys.reduce(
    (define, envName) => {
      if (!defined[envName as keyof T]) {
        throw new EnvNotSetError(envName);
      }

      define[`${keyPrefix}${envName}`] = JSON.stringify(
        defined[envName as keyof T],
      );

      return define;
    },
    {} as Record<string, string>,
  );
};
