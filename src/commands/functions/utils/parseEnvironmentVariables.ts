import fs from 'node:fs';
import dotenv from 'dotenv';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';

export type EnvironmentVariables = { [key: string]: string };

export type ParseEnvironmentVariablesArgs = { env: string[] };
export type ParseEnvironmentVariablesFileArgs = { envFile: string };
export type GetEnvironmentVariablesArgs = { env: string[]; envFile?: string };

export const parseEnvironmentVariablesFile = (
  args: ParseEnvironmentVariablesFileArgs,
): EnvironmentVariables => {
  const { envFile } = args;

  if (!fs.statSync(envFile).isFile()) {
    output.mistake(t('filePathNotFound', { envFile }));

    return {};
  }

  try {
    const envFileContent = fs.readFileSync(envFile);
    const config = dotenv.parse(envFileContent);

    return config;
  } catch (err) {
    output.mistake(t('envFileParseError', { envFile }));

    return {};
  }
};

export const parseEnvironmentVariables = (
  args: ParseEnvironmentVariablesArgs,
): EnvironmentVariables => {
  const { env } = args;

  return env.reduce<{ [key: string]: string }>((acc, curr) => {
    const [key, value] = curr.split('=');

    let varValue = value;

    if (!varValue) {
      // eslint-disable-next-line no-process-env
      const envValue = process.env[key];

      if (!envValue) {
        output.mistake(t('missingEnvVar', { key }));

        return acc;
      }

      varValue = envValue;
    }

    acc[key] = varValue;

    return acc;
  }, {});
};

export const getEnvironmentVariables = (
  args: GetEnvironmentVariablesArgs,
): EnvironmentVariables => {
  const { env, envFile } = args;

  const environmentVariables = parseEnvironmentVariables({ env });

  let envFileContent: EnvironmentVariables = {};

  if (envFile) {
    envFileContent = parseEnvironmentVariablesFile({ envFile });
  }

  return { ...envFileContent, ...environmentVariables };
};
