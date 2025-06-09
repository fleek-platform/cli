// Warning this file may be included from outside `/src`
// For example, see `/bin/index.js`
import { readFileSync } from 'node:fs';
import path from 'node:path';

// The build distribution target directory
const BUILD_DIST_PATHNAME = path.join(path.sep, 'dist');

// Fallback path is the `src` used in tests
const TEST_SRC_PATHNAME = path.join(path.sep, 'src');

const leadingSlash = (str: string) => (str.startsWith(path.sep) ? str : `${path.sep}${str}`);

const resolvePath = (filename: string) => {
  /* eslint-disable no-process-env */
  return path.join(
    __dirname.split(
      process.env.VITEST ? TEST_SRC_PATHNAME : BUILD_DIST_PATHNAME,
    )[0],
    leadingSlash(filename),
  );
};

// JSON files should live outside `src`
// help prevent tsc from generating the directory `/dist/src`
// as current setup prefers surface files from `/src` into `/dist`
export const loadJSONFromPackageRoot = (filename: string) => {
  const resolved = resolvePath(filename);

  return JSON.parse(readFileSync(resolved, 'utf-8'));
};
