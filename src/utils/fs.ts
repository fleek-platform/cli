import { promises as fsPromises, realpathSync } from 'node:fs';

interface FsError extends Error {
  code?: string;
}

export const fileExists = async (path: string) => {
  try {
    const stat = await fsPromises.stat(path);

    return stat.isFile();
  } catch (e) {
    const err = e as FsError;
    if (err.code === 'ENOENT') {
      return false;
    }

    throw e;
  }
};

export const isGlobalNodeModuleInstall = () => {
  const GLOBAL_EXEC_PATH_INCLUDES =
    'node_modules/@fleek-platform/cli/bin/index.js';
  const executedScript = realpathSync(process.argv[1]);
  return executedScript.includes(GLOBAL_EXEC_PATH_INCLUDES);
};
