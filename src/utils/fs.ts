import { promises as fsPromises } from 'node:fs';

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
