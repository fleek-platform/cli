import { promises as fs } from 'node:fs';

interface FsError extends Error {
  code?: string;
}

export const directoryExists = async (path: string) => {
  try {
    const stat = await fs.stat(path);

    return stat.isDirectory();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e) {
    const err = e as FsError;
    if (err.code === 'ENOENT') {
      return false;
    }

    throw e;
  }
};
