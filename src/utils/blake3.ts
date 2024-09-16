import fs from 'node:fs/promises';
import { blake3 } from 'hash-wasm';

export const calculateBlake3Hash = async ({
  filePath,
  onFailure,
}: {
  filePath: string;
  onFailure: () => void;
}) => {
  try {
    const buffer = await fs.readFile(filePath);
    return await blake3(buffer);
  } catch {
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }
};
