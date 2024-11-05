#!/usr/bin/env node

'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv/config');

const semver = require('semver');

// The `dist/bundle` is a temporary version
// should use the version `dist/cli` instead
const { asyncParser, init } = require('../dist/bundle');
const { loadJSONFromPackageRoot } = require('../dist/utils/json');
const { checkForPackageUpdates } = require('../dist/utils/update-notifier');
const { isGlobalNodeModuleInstall } = require('../dist/utils/fs');

const pkgJson = loadJSONFromPackageRoot('package.json');
const pkgVersion = pkgJson.version;
const requiredVersion = pkgJson.engines.node;

// Hide deprecation warnings for production builds
// Otherwise, shows in development environment
// https://nodejs.org/api/process.html#processnodeprecation
if (isGlobalNodeModuleInstall()) {
  process.noDeprecation = true;
}

if (!semver.satisfies(process.version, requiredVersion)) {
  // TODO: Pick text from locales
  console.error(`⚠️ You are using Node ${process.version}. We require Node ${requiredVersion} or higher!`);
  process.exit(1);
}

// Inform users of updates in a non-blocking manner
checkForPackageUpdates(pkgJson);

// Catch uncaught exception(s)
process.once('uncaughtException', (error) => {
  throw error;
});

// Initialise
init({ version: pkgVersion, parser: asyncParser });
