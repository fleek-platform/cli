import * as fs from 'node:fs';
import * as os from 'node:os';

import {
  FleekFunctionInvalidWasmCodeError,
  FleekFunctionPathNotValidError,
  FleekFunctionWasmEncryptionFailedError,
} from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { encrypt } from 'eciesjs';
import { output } from '../../../cli';
import { t } from '../../../utils/translation';

const PUBLIC_KEY =
  '03a3fe41244add26af1f820d2acb4ad22b158ff7b69ce41401bf932d7734eb5d49';

const getWasm = async (filePath: string) => {
  const buffer = await fs.promises.readFile(filePath);
  if (buffer.length < 8) {
    return null;
  }

  // WebAssembly namespace is only supported in dom in typescript
  // https://webassembly.github.io/spec/core/binary/modules.html#binary-module
  const wasmMagicNumber = [0x00, 0x61, 0x73, 0x6d];
  for (let i = 0; i < 4; i++) {
    if (buffer[i] !== wasmMagicNumber[i]) {
      return null;
    }
  }
  return buffer;
};

const enryptCode = async (args: { filePath: string }) => {
  const { filePath } = args;

  const buffer = await getWasm(filePath);
  if (!buffer) {
    output.error(t('invalidWasmCode', { path: filePath }));
    throw new FleekFunctionInvalidWasmCodeError({});
  }

  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', {
        action: t('encryptingCode'),
      }),
    },
    cliProgress.Presets.shades_grey,
  );

  let tempDir: string;

  if (!output.debugEnabled) {
    tempDir = os.tmpdir();
  } else {
    tempDir = '.fleek';

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
  }
  const outFile = `${tempDir}/function.wasm`;

  progressBar.start(100, 10);
  try {
    const encryptedData = encrypt(PUBLIC_KEY, buffer);
    progressBar.update(50);

    await fs.promises.writeFile(outFile, encryptedData);
  } catch (error) {
    progressBar.stop();
    throw new FleekFunctionWasmEncryptionFailedError({});
  }
  progressBar.update(100);
  progressBar.stop();

  return outFile;
};

export const getWasmCodeFromPath = async (args: {
  filePath: string;
}) => {
  const { filePath } = args;

  if (!fs.existsSync(filePath)) {
    throw new FleekFunctionPathNotValidError({ path: filePath });
  }

  return enryptCode({ filePath });
};
