# Changelog

## 3.5.2

### Patch Changes

- 0c1014d: Hide deprecation warnings on global install

## 3.5.1

### Patch Changes

- 2233121: Fix storage delete by SDK v3.5.3 update

## 3.5.0

### Minor Changes

- f903a59: Fix typescript configuration file loader

## 3.4.0

### Minor Changes

- 06037b3: Associate function to a site on creation
- 9185d8d: Update @fleek-platform dependencies

## 3.3.0

### Minor Changes

- 810432e: Enhance hostname prompt error handling
- 4c7e91d: Ensure consistent help flag behavior across commands

## 3.2.0

### Minor Changes

- d4ed639: Replace deprecated CF-IPFS Gateway
- 12e1cd1: Add common help command handler to prevent misses

### Patch Changes

- 8b3c501: Resolve compatibility issues with latest eciesjs version

## 3.1.1

### Patch Changes

- e6c8d3c: Fix the fleek config template file location, add help to missing subcommands

## 3.1.0

### Minor Changes

- 2976cd6: Replace `noBundle` parameter by `bundle` to be more inline with remaining parameter settings and remove negation that can be counter-intuitive or confusing.

## 3.0.0

### Major Changes

- f358f9a: Introduces Functions SGX support with SDK v3

## 2.9.0

### Minor Changes

- f726bcc: Bundling parameter amends

### Patch Changes

- bff66ce: Parameters enhancements and upgrade the errors package

## 2.8.9

### Patch Changes

- fa97a4e: Remove duplicate dependency for esbuild
- 5606955: Remove duplicate dotenv dependency
- d50dcec: Fix environment variables, amongst other tweaks related to duplicate dependencies

## 2.8.8

### Patch Changes

- b256c95: Introduce the changeset commands

## 2.8.0

### Minor Changes

- 3deebdf: Revise dependencies

## 2.7.0

### Minor Changes

- b59ee25: Deprecate env var parse, favouring local version for CLI (single use case)
- b59ee25: Remove @fleekxyz/utils favouring single purpose packages

### Patch Changes

- Updated dependencies [b59ee25]
  - @fleekxyz/errors@2.1.0
  - @fleekxyz/tester@2.0.2

## 2.6.0

### Minor Changes

- a2a567e: Prefer single-purpose package for IPFS, over bag-of-things

## 2.5.0

### Minor Changes

- 00a320a: Favour utils-ipfs for common types and functions
- 00a320a: Prefer single-purpose package for IPFS, over bag-of-things

## 2.4.0

### Minor Changes

- da2190b: Add EMAIL channel

## 2.3.0

### Minor Changes

- 7213c97: Remove factory pattern for authentication handlers

## 2.2.0

### Minor Changes

- 2410767: The CLI environment vars handling revision

## 2.1.0

### Minor Changes

- 42e7b95: Use the default Fleek Gateway URL by Slug, as the IPFS gateway takes time to resolve due to IPFS propagation.

## 2.0.0

### Major Changes

- 61bcbe9: Add the serverless functions service

### Minor Changes

- 1f2febf: Add 2FA-protected actions
- 8a88f28: Resolves DNS configuration display issues, introduces a non-blocking update notification system, and corrects terminology from 'whitelabel' to 'whitelisting', among other enhancements.
- 7e0d616: Deprecates the @fleekxyz/routes
- c36112d: Replace white label domains with white list domains

## 1.3.7

### Patch Changes

- Updated dependencies [d35040e]
  - @fleekxyz/env-guards@1.2.1
  - @fleekxyz/sdk@1.4.0
  - @fleekxyz/tester@1.3.1
  - @fleekxyz/gql-client-utils@1.2.6

## 1.3.6

### Patch Changes

- Updated dependencies [e58c451]
  - @fleekxyz/validation@1.4.0
  - @fleekxyz/errors@1.4.0
  - @fleekxyz/gql-client-utils@1.2.5
  - @fleekxyz/sdk@1.4.0
  - @fleekxyz/auth@1.1.2
  - @fleekxyz/tester@1.3.1

## 1.3.5

### Patch Changes

- @fleekxyz/gql-client-utils@1.2.4
- @fleekxyz/sdk@1.4.0

## 1.3.4

### Patch Changes

- Updated dependencies [dcdc34d]
  - @fleekxyz/sdk@1.4.0

## 1.3.3

### Patch Changes

- @fleekxyz/gql-client-utils@1.2.3
- @fleekxyz/sdk@1.3.3

## 1.3.2

### Patch Changes

- Updated dependencies [34123e6]
  - @fleekxyz/validation@1.3.0
  - @fleekxyz/errors@1.3.0
  - @fleekxyz/tester@1.3.0
  - @fleekxyz/sites@1.2.0
  - @fleekxyz/gql-client-utils@1.2.2
  - @fleekxyz/sdk@1.3.2
  - @fleekxyz/auth@1.1.1

## 1.3.1

### Patch Changes

- @fleekxyz/gql-client-utils@1.2.1
- @fleekxyz/sdk@1.3.1

## 1.3.0

### Minor Changes

- 209599d: Deprecate client generated process, favouring SDK. Further improvements for the NPM packaging for CLI dependencies which is used as POC, to surface most of the work that'll be required across the project packages. Modifies ESLint custom plugins to be importable in ESM vs CJS. The CLI builder is now deprecated in favour of Typescript's tsc. The CLI is now a ESM.

### Patch Changes

- Updated dependencies [209599d]
  - @fleekxyz/auth@1.1.0
  - @fleekxyz/env-guards@1.2.0
  - @fleekxyz/errors@1.2.0
  - @fleekxyz/gql-client-utils@1.2.0
  - @fleekxyz/routes@1.2.0
  - @fleekxyz/sdk@1.3.0
  - @fleekxyz/sites@1.1.0
  - @fleekxyz/tester@1.2.0
  - @fleekxyz/validation@1.2.0

## 1.2.1

### Patch Changes

- 9291f73: remove requires from cli

## 1.2.0

### Minor Changes

- 074e0dc: Deprecate client-generated in-package schemas, to favour the SDK package as its origin.

### Patch Changes

- Updated dependencies [074e0dc]
  - @fleekxyz/gql-client-utils@1.1.0
  - @fleekxyz/env-guards@1.1.0
  - @fleekxyz/routes@1.1.0
  - @fleekxyz/sdk@1.2.0
  - @fleekxyz/tester@1.1.1
  - @fleekxyz/errors@1.1.1
  - @fleekxyz/sites@1.0.5
  - @fleekxyz/auth@1.0.5
  - @fleekxyz/validation@1.1.0

## 1.1.0

### Minor Changes

- 0793cc0: Add DNSLink improvements and refactor

## 1.0.1

### Patch Changes

- ef29866: add delete endpoint on proxy and on sdk and cli

## 1.0.0

### Major Changes

- 84dd190: feat: [APP2-126] [DNS Link for sites] - BE

## 0.7.2 (2023-10-26)

### Features

- **cli, sdk:** CLI 0.7.0 and SDK 0.7.0 ([#1763](https://github.com/FleekHQ/fleek/issues/1763)) ([3ba7f98](https://github.com/FleekHQ/fleek/commit/3ba7f986d484aa622a0dcf78196b3c4f0cd5a59e))
- **cli:** command to list projects, option name to switch or create … ([#1145](https://github.com/FleekHQ/fleek/issues/1145)) ([9c9a794](https://github.com/FleekHQ/fleek/commit/9c9a794b56b2795ac3a970a0dab4692a88a44929))
- **cli:** include pgw name and slug in parentheses ([#1205](https://github.com/FleekHQ/fleek/issues/1205)) ([9777615](https://github.com/FleekHQ/fleek/commit/9777615a21cce0946499c2213026ad88d9f62d42))
- ENS Integration ([#1045](https://github.com/FleekHQ/fleek/issues/1045)) ([d0cf4b0](https://github.com/FleekHQ/fleek/commit/d0cf4b02aeabba6176d32dd38506e06a8f8159f4))
- gateway detail ([#1168](https://github.com/FleekHQ/fleek/issues/1168)) ([ed6398a](https://github.com/FleekHQ/fleek/commit/ed6398a5ad5cbfd119b8f9a2978170c8a78f69c4))
- pgw hard delete ([#1801](https://github.com/FleekHQ/fleek/issues/1801)) ([3e29cdf](https://github.com/FleekHQ/fleek/commit/3e29cdfee3620f5b45400d2a452ec33854a80e74))
- primary domain ([#1829](https://github.com/FleekHQ/fleek/issues/1829)) ([8260fd8](https://github.com/FleekHQ/fleek/commit/8260fd8c091d213cdef0c912ec7f28e4e7a753b5))
- propagate commit hash to graphql/sdk/cli ([#1498](https://github.com/FleekHQ/fleek/issues/1498)) ([3e83511](https://github.com/FleekHQ/fleek/commit/3e83511c150bcd7e0bbf6e2828a2440abedc578d))
- sdk tests ([#1176](https://github.com/FleekHQ/fleek/issues/1176)) ([201e038](https://github.com/FleekHQ/fleek/commit/201e038a07d6c88e7f3ed424ce4a3898cf6e99f0))
- storage pins ([#1370](https://github.com/FleekHQ/fleek/issues/1370)) ([9ad1bac](https://github.com/FleekHQ/fleek/commit/9ad1bacca1c6d0775fbb60282de3d0e8d91b98d2))
- united prisma ([#1198](https://github.com/FleekHQ/fleek/issues/1198)) ([e92f5b5](https://github.com/FleekHQ/fleek/commit/e92f5b5881d574b6e8b390d46c2e884481f4ddc3))

### Bug Fixes

- **cli:** add ENS to run.ts ([4c4c188](https://github.com/FleekHQ/fleek/commit/4c4c188c46a57a408415d639d59f20193e77a730))
- **cli:** Alias `version` for `--version` ([3bcc605](https://github.com/FleekHQ/fleek/commit/3bcc605a5e811b387f083f7a0d80505cfa556f15))
- **cli:** Don't continue with not-existing choice in selectPrompt ([#1161](https://github.com/FleekHQ/fleek/issues/1161)) ([c96c216](https://github.com/FleekHQ/fleek/commit/c96c216693d32188b2275270c2bec92fdd8e7e77))
- **cli:** ignore user's tsconfig files and show specific error message instead of our general message ([#1897](https://github.com/FleekHQ/fleek/issues/1897)) ([e4e6c74](https://github.com/FleekHQ/fleek/commit/e4e6c7485c01c69e892188d32eecad33410ba795))
- **cli:** project name validation message ([2a5e8ff](https://github.com/FleekHQ/fleek/commit/2a5e8ffecad512de1a87267299a6e99a8e39761b))
- **cli:** typo in `list` commands description ([0278505](https://github.com/FleekHQ/fleek/commit/0278505f9f997a398907c19daf761c814ebbe80c))
- **cli:** user may specify `config` option that sets different path of Fleek configuration file ([#1814](https://github.com/FleekHQ/fleek/issues/1814)) ([8227596](https://github.com/FleekHQ/fleek/commit/8227596734cb9885239c0c5049633e2baa78f25c))
- ENS CLI post-QA ([#1225](https://github.com/FleekHQ/fleek/issues/1225)) ([3329b96](https://github.com/FleekHQ/fleek/commit/3329b9656bf0f7a8004765ac1352e01f9c8ea456))
- ipfs sdk ([#1165](https://github.com/FleekHQ/fleek/issues/1165)) ([37e72b6](https://github.com/FleekHQ/fleek/commit/37e72b62fd29d4cce90625926d0c7d71e5897bc1))

### Miscellaneous Chores

- release 0.5.0 ([#1169](https://github.com/FleekHQ/fleek/issues/1169)) ([df8e574](https://github.com/FleekHQ/fleek/commit/df8e574c8efbe896023d9b74fc057989744f3b82))
- release 0.6.0. ([#1238](https://github.com/FleekHQ/fleek/issues/1238)) ([11a5bbd](https://github.com/FleekHQ/fleek/commit/11a5bbd7ffef6b4082d2ec0ea7bca50d84876508))
- release 0.7.1. ([3c7ad09](https://github.com/FleekHQ/fleek/commit/3c7ad09dbad205bcbeea76f3becae2d343fa1d59))
- release 0.7.1. ([32fb11b](https://github.com/FleekHQ/fleek/commit/32fb11b36d8bbdd70e98a5330918d289aec91a63))
- release 0.7.1. ([99469dc](https://github.com/FleekHQ/fleek/commit/99469dc145cb90cd5b4d7b81bf796fc79ab07215))
- release 0.7.2. ([3993a37](https://github.com/FleekHQ/fleek/commit/3993a37776ca5054ef64c0358e32c9e8fc99c4a5))

## 0.7.1 (2023-10-12)

### Features

- application credentials cli ([#1007](https://github.com/FleekHQ/fleek/issues/1007)) ([a3cf51d](https://github.com/FleekHQ/fleek/commit/a3cf51d86beb8368aa2e41741aedb9631495d5b3))
- **cli, sdk:** CLI 0.7.0 and SDK 0.7.0 ([#1763](https://github.com/FleekHQ/fleek/issues/1763)) ([3ba7f98](https://github.com/FleekHQ/fleek/commit/3ba7f986d484aa622a0dcf78196b3c4f0cd5a59e))
- **cli:** Add jsdoc into JS configuration file with type declaration imported from Fleek CLI ([#1008](https://github.com/FleekHQ/fleek/issues/1008)) ([fc2f90f](https://github.com/FleekHQ/fleek/commit/fc2f90fc62873af384fd844f9e2bb741fc276fa0))
- **cli:** command to list projects, option name to switch or create … ([#1145](https://github.com/FleekHQ/fleek/issues/1145)) ([9c9a794](https://github.com/FleekHQ/fleek/commit/9c9a794b56b2795ac3a970a0dab4692a88a44929))
- **cli:** include pgw name and slug in parentheses ([#1205](https://github.com/FleekHQ/fleek/issues/1205)) ([9777615](https://github.com/FleekHQ/fleek/commit/9777615a21cce0946499c2213026ad88d9f62d42))
- **cli:** more universal loading of configuration (.json/.ts/.js) ([#955](https://github.com/FleekHQ/fleek/issues/955)) ([fc27a2d](https://github.com/FleekHQ/fleek/commit/fc27a2d3a7b5cb6e047bc07ff200e277649ca22a))
- ENS Integration ([#1045](https://github.com/FleekHQ/fleek/issues/1045)) ([d0cf4b0](https://github.com/FleekHQ/fleek/commit/d0cf4b02aeabba6176d32dd38506e06a8f8159f4))
- gateway detail ([#1168](https://github.com/FleekHQ/fleek/issues/1168)) ([ed6398a](https://github.com/FleekHQ/fleek/commit/ed6398a5ad5cbfd119b8f9a2978170c8a78f69c4))
- **graphql:** add authScopes with specific Fleek errors everywhere they are missing ([#1014](https://github.com/FleekHQ/fleek/issues/1014)) ([808c747](https://github.com/FleekHQ/fleek/commit/808c7474673df64c628f2ee9a6d85ff71570e145))
- **graphql:** queries mutations schema for pgw ([#987](https://github.com/FleekHQ/fleek/issues/987)) ([ef4a14d](https://github.com/FleekHQ/fleek/commit/ef4a14d5b5d6c24f7eea31b5fdb957e4aa4d5b80))
- pgw hard delete ([#1801](https://github.com/FleekHQ/fleek/issues/1801)) ([3e29cdf](https://github.com/FleekHQ/fleek/commit/3e29cdfee3620f5b45400d2a452ec33854a80e74))
- primary domain ([#1829](https://github.com/FleekHQ/fleek/issues/1829)) ([8260fd8](https://github.com/FleekHQ/fleek/commit/8260fd8c091d213cdef0c912ec7f28e4e7a753b5))
- propagate commit hash to graphql/sdk/cli ([#1498](https://github.com/FleekHQ/fleek/issues/1498)) ([3e83511](https://github.com/FleekHQ/fleek/commit/3e83511c150bcd7e0bbf6e2828a2440abedc578d))
- sdk tests ([#1176](https://github.com/FleekHQ/fleek/issues/1176)) ([201e038](https://github.com/FleekHQ/fleek/commit/201e038a07d6c88e7f3ed424ce4a3898cf6e99f0))
- site ipns improvements ([#988](https://github.com/FleekHQ/fleek/issues/988)) ([3e6913f](https://github.com/FleekHQ/fleek/commit/3e6913f3fd72775a6114ffbca652425efc39c23b))
- **sites-prisma, graphql, sdk, cli:** add a IpnsRecord for a Site and automatic publishing during deployment ([#925](https://github.com/FleekHQ/fleek/issues/925)) ([ebdd18f](https://github.com/FleekHQ/fleek/commit/ebdd18ff27082f4f7857ebc0d95cf86288f2887f))
- storage pins ([#1370](https://github.com/FleekHQ/fleek/issues/1370)) ([9ad1bac](https://github.com/FleekHQ/fleek/commit/9ad1bacca1c6d0775fbb60282de3d0e8d91b98d2))
- united prisma ([#1198](https://github.com/FleekHQ/fleek/issues/1198)) ([e92f5b5](https://github.com/FleekHQ/fleek/commit/e92f5b5881d574b6e8b390d46c2e884481f4ddc3))

### Bug Fixes

- **cli:** add ENS to run.ts ([4c4c188](https://github.com/FleekHQ/fleek/commit/4c4c188c46a57a408415d639d59f20193e77a730))
- **cli:** Alias `version` for `--version` ([3bcc605](https://github.com/FleekHQ/fleek/commit/3bcc605a5e811b387f083f7a0d80505cfa556f15))
- **cli:** Don't continue with not-existing choice in selectPrompt ([#1161](https://github.com/FleekHQ/fleek/issues/1161)) ([c96c216](https://github.com/FleekHQ/fleek/commit/c96c216693d32188b2275270c2bec92fdd8e7e77))
- **cli:** project name validation message ([2a5e8ff](https://github.com/FleekHQ/fleek/commit/2a5e8ffecad512de1a87267299a6e99a8e39761b))
- **cli:** typo in `list` commands description ([0278505](https://github.com/FleekHQ/fleek/commit/0278505f9f997a398907c19daf761c814ebbe80c))
- **cli:** use older FS constants object ([#978](https://github.com/FleekHQ/fleek/issues/978)) ([d7ce92c](https://github.com/FleekHQ/fleek/commit/d7ce92c82eba8e2fd0f949e8eabf89cb5f82db49))
- **cli:** user may specify `config` option that sets different path of Fleek configuration file ([#1814](https://github.com/FleekHQ/fleek/issues/1814)) ([8227596](https://github.com/FleekHQ/fleek/commit/8227596734cb9885239c0c5049633e2baa78f25c))
- ENS CLI post-QA ([#1225](https://github.com/FleekHQ/fleek/issues/1225)) ([3329b96](https://github.com/FleekHQ/fleek/commit/3329b9656bf0f7a8004765ac1352e01f9c8ea456))
- ipfs sdk ([#1165](https://github.com/FleekHQ/fleek/issues/1165)) ([37e72b6](https://github.com/FleekHQ/fleek/commit/37e72b62fd29d4cce90625926d0c7d71e5897bc1))
- release cli deploy ([#975](https://github.com/FleekHQ/fleek/issues/975)) ([0c08844](https://github.com/FleekHQ/fleek/commit/0c088448d9fdcb6af4caf42dbb0aebc6beaf7ed7))

### Miscellaneous Chores

- **cli, sdk:** release 0.4.0 ([61edcd4](https://github.com/FleekHQ/fleek/commit/61edcd4acd72e1a47f1166333c0bb8d9e75c216f))
- release 0.5.0 ([#1169](https://github.com/FleekHQ/fleek/issues/1169)) ([df8e574](https://github.com/FleekHQ/fleek/commit/df8e574c8efbe896023d9b74fc057989744f3b82))
- release 0.6.0. ([#1238](https://github.com/FleekHQ/fleek/issues/1238)) ([11a5bbd](https://github.com/FleekHQ/fleek/commit/11a5bbd7ffef6b4082d2ec0ea7bca50d84876508))
- release 0.7.1. ([3c7ad09](https://github.com/FleekHQ/fleek/commit/3c7ad09dbad205bcbeea76f3becae2d343fa1d59))
- release 0.7.1. ([32fb11b](https://github.com/FleekHQ/fleek/commit/32fb11b36d8bbdd70e98a5330918d289aec91a63))
- release 0.7.1. ([99469dc](https://github.com/FleekHQ/fleek/commit/99469dc145cb90cd5b4d7b81bf796fc79ab07215))

## 0.7.0 (2023-09-12)

### Features

- add metadata and Site relation for Pins ([#961](https://github.com/FleekHQ/fleek/issues/961)) ([102e1c3](https://github.com/FleekHQ/fleek/commit/102e1c3a9557367adda157d5b19b56adc94f00da))
- application credentials cli ([#1007](https://github.com/FleekHQ/fleek/issues/1007)) ([a3cf51d](https://github.com/FleekHQ/fleek/commit/a3cf51d86beb8368aa2e41741aedb9631495d5b3))
- **cli, sdk:** CLI 0.7.0 and SDK 0.7.0 ([#1763](https://github.com/FleekHQ/fleek/issues/1763)) ([3ba7f98](https://github.com/FleekHQ/fleek/commit/3ba7f986d484aa622a0dcf78196b3c4f0cd5a59e))
- **cli:** Add jsdoc into JS configuration file with type declaration imported from Fleek CLI ([#1008](https://github.com/FleekHQ/fleek/issues/1008)) ([fc2f90f](https://github.com/FleekHQ/fleek/commit/fc2f90fc62873af384fd844f9e2bb741fc276fa0))
- **cli:** added CID into IPNS table ([#887](https://github.com/FleekHQ/fleek/issues/887)) ([2fc3999](https://github.com/FleekHQ/fleek/commit/2fc39999770f7320fda8f72a4908a56c483db90d))
- **cli:** command to list projects, option name to switch or create … ([#1145](https://github.com/FleekHQ/fleek/issues/1145)) ([9c9a794](https://github.com/FleekHQ/fleek/commit/9c9a794b56b2795ac3a970a0dab4692a88a44929))
- **cli:** domains verify command flow improvement ([#964](https://github.com/FleekHQ/fleek/issues/964)) ([d478851](https://github.com/FleekHQ/fleek/commit/d47885143ab27965665368462e2062a16c0934d5))
- **cli:** fix tsc lint ([27c8630](https://github.com/FleekHQ/fleek/commit/27c8630a236c2488b7e72859220d61fd38fcb497))
- **cli:** include pgw name and slug in parentheses ([#1205](https://github.com/FleekHQ/fleek/issues/1205)) ([9777615](https://github.com/FleekHQ/fleek/commit/9777615a21cce0946499c2213026ad88d9f62d42))
- **cli:** more universal loading of configuration (.json/.ts/.js) ([#955](https://github.com/FleekHQ/fleek/issues/955)) ([fc27a2d](https://github.com/FleekHQ/fleek/commit/fc27a2d3a7b5cb6e047bc07ff200e277649ca22a))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** show warning if Node.js is out of supported range ([#963](https://github.com/FleekHQ/fleek/issues/963)) ([cad0fee](https://github.com/FleekHQ/fleek/commit/cad0fee815d54fdbb8b6ae8cd74bf947d3f26e08))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- ENS Integration ([#1045](https://github.com/FleekHQ/fleek/issues/1045)) ([d0cf4b0](https://github.com/FleekHQ/fleek/commit/d0cf4b02aeabba6176d32dd38506e06a8f8159f4))
- fix lint error ([05f5b02](https://github.com/FleekHQ/fleek/commit/05f5b02c6db2d37f5e8e61990d516b8865cf77c8))
- gateway detail ([#1168](https://github.com/FleekHQ/fleek/issues/1168)) ([ed6398a](https://github.com/FleekHQ/fleek/commit/ed6398a5ad5cbfd119b8f9a2978170c8a78f69c4))
- **graphql:** add authScopes with specific Fleek errors everywhere they are missing ([#1014](https://github.com/FleekHQ/fleek/issues/1014)) ([808c747](https://github.com/FleekHQ/fleek/commit/808c7474673df64c628f2ee9a6d85ff71570e145))
- **graphql:** from mutation to query to obtain PAT from verification session ([#912](https://github.com/FleekHQ/fleek/issues/912)) ([ee8fc73](https://github.com/FleekHQ/fleek/commit/ee8fc73bc8c55d179c4880150218f0e153ece563))
- **graphql:** integration tests with prisma ([#790](https://github.com/FleekHQ/fleek/issues/790)) ([fbf2a61](https://github.com/FleekHQ/fleek/commit/fbf2a616bc32b9233d73fcb65453ce089c7aafe8))
- **graphql:** queries mutations schema for pgw ([#987](https://github.com/FleekHQ/fleek/issues/987)) ([ef4a14d](https://github.com/FleekHQ/fleek/commit/ef4a14d5b5d6c24f7eea31b5fdb957e4aa4d5b80))
- propagate commit hash to graphql/sdk/cli ([#1498](https://github.com/FleekHQ/fleek/issues/1498)) ([3e83511](https://github.com/FleekHQ/fleek/commit/3e83511c150bcd7e0bbf6e2828a2440abedc578d))
- sdk tests ([#1176](https://github.com/FleekHQ/fleek/issues/1176)) ([201e038](https://github.com/FleekHQ/fleek/commit/201e038a07d6c88e7f3ed424ce4a3898cf6e99f0))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- site ipns improvements ([#988](https://github.com/FleekHQ/fleek/issues/988)) ([3e6913f](https://github.com/FleekHQ/fleek/commit/3e6913f3fd72775a6114ffbca652425efc39c23b))
- **sites-prisma, graphql, sdk, cli:** add a IpnsRecord for a Site and automatic publishing during deployment ([#925](https://github.com/FleekHQ/fleek/issues/925)) ([ebdd18f](https://github.com/FleekHQ/fleek/commit/ebdd18ff27082f4f7857ebc0d95cf86288f2887f))
- storage pins ([#1370](https://github.com/FleekHQ/fleek/issues/1370)) ([9ad1bac](https://github.com/FleekHQ/fleek/commit/9ad1bacca1c6d0775fbb60282de3d0e8d91b98d2))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- **ui:** logo in navigation bar is only symbol without the Fleek ([#937](https://github.com/FleekHQ/fleek/issues/937)) ([27e246e](https://github.com/FleekHQ/fleek/commit/27e246e44228d21db222156971a2512c1672669b))
- united prisma ([#1198](https://github.com/FleekHQ/fleek/issues/1198)) ([e92f5b5](https://github.com/FleekHQ/fleek/commit/e92f5b5881d574b6e8b390d46c2e884481f4ddc3))

### Bug Fixes

- cli sites ci location bug ([#895](https://github.com/FleekHQ/fleek/issues/895)) ([2908ec5](https://github.com/FleekHQ/fleek/commit/2908ec5d6bea33a171eb1e0e2e7c717d4011498e))
- **cli:** add ENS to run.ts ([4c4c188](https://github.com/FleekHQ/fleek/commit/4c4c188c46a57a408415d639d59f20193e77a730))
- **cli:** Alias `version` for `--version` ([3bcc605](https://github.com/FleekHQ/fleek/commit/3bcc605a5e811b387f083f7a0d80505cfa556f15))
- **cli:** command `ipns delete` - move confirmation prompt after record selection prompt ([#893](https://github.com/FleekHQ/fleek/issues/893)) ([491b3be](https://github.com/FleekHQ/fleek/commit/491b3be11a7257727488fc42409dd7fcfcf021ff))
- **cli:** Don't continue with not-existing choice in selectPrompt ([#1161](https://github.com/FleekHQ/fleek/issues/1161)) ([c96c216](https://github.com/FleekHQ/fleek/commit/c96c216693d32188b2275270c2bec92fdd8e7e77))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output error via output or throw, not both ([#889](https://github.com/FleekHQ/fleek/issues/889)) ([500b3aa](https://github.com/FleekHQ/fleek/commit/500b3aa6d5e2075b69e43ed2d1e16610652a7990))
- **cli:** project name validation message ([2a5e8ff](https://github.com/FleekHQ/fleek/commit/2a5e8ffecad512de1a87267299a6e99a8e39761b))
- **cli:** query `createPersonalAccessTokenFromVerificationSession` is now mutation ([#971](https://github.com/FleekHQ/fleek/issues/971)) ([30be735](https://github.com/FleekHQ/fleek/commit/30be73598349df925c6c6f3a8ab118e0d4a45801))
- **cli:** typo in `list` commands description ([0278505](https://github.com/FleekHQ/fleek/commit/0278505f9f997a398907c19daf761c814ebbe80c))
- **cli:** use existing site or create ([#885](https://github.com/FleekHQ/fleek/issues/885)) ([85915c9](https://github.com/FleekHQ/fleek/commit/85915c938acdcdddcf311084ed2438a59016dd4e))
- **cli:** use older FS constants object ([#978](https://github.com/FleekHQ/fleek/issues/978)) ([d7ce92c](https://github.com/FleekHQ/fleek/commit/d7ce92c82eba8e2fd0f949e8eabf89cb5f82db49))
- ENS CLI post-QA ([#1225](https://github.com/FleekHQ/fleek/issues/1225)) ([3329b96](https://github.com/FleekHQ/fleek/commit/3329b9656bf0f7a8004765ac1352e01f9c8ea456))
- hash prompt in `ipns publish` command in cli, fix SDK ipns client ([#892](https://github.com/FleekHQ/fleek/issues/892)) ([eb40258](https://github.com/FleekHQ/fleek/commit/eb402586bb39a9b7cdd1a6f933044f60d2bd4849))
- ipfs sdk ([#1165](https://github.com/FleekHQ/fleek/issues/1165)) ([37e72b6](https://github.com/FleekHQ/fleek/commit/37e72b62fd29d4cce90625926d0c7d71e5897bc1))
- release cli deploy ([#975](https://github.com/FleekHQ/fleek/issues/975)) ([0c08844](https://github.com/FleekHQ/fleek/commit/0c088448d9fdcb6af4caf42dbb0aebc6beaf7ed7))

### Miscellaneous Chores

- **cli, sdk:** release 0.4.0 ([61edcd4](https://github.com/FleekHQ/fleek/commit/61edcd4acd72e1a47f1166333c0bb8d9e75c216f))
- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))
- release 0.3.0 ([#904](https://github.com/FleekHQ/fleek/issues/904)) ([d45103c](https://github.com/FleekHQ/fleek/commit/d45103caafa8991e2d66da773e3805a6d1d58c3f))
- release 0.3.0-rc.1 ([#900](https://github.com/FleekHQ/fleek/issues/900)) ([17493ed](https://github.com/FleekHQ/fleek/commit/17493edbbf11aa6b69dd005b85eb8f3460806b42))
- release 0.5.0 ([#1169](https://github.com/FleekHQ/fleek/issues/1169)) ([df8e574](https://github.com/FleekHQ/fleek/commit/df8e574c8efbe896023d9b74fc057989744f3b82))
- release 0.6.0. ([#1238](https://github.com/FleekHQ/fleek/issues/1238)) ([11a5bbd](https://github.com/FleekHQ/fleek/commit/11a5bbd7ffef6b4082d2ec0ea7bca50d84876508))

## 0.6.0 (2023-07-24)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- add metadata and Site relation for Pins ([#961](https://github.com/FleekHQ/fleek/issues/961)) ([102e1c3](https://github.com/FleekHQ/fleek/commit/102e1c3a9557367adda157d5b19b56adc94f00da))
- application credentials cli ([#1007](https://github.com/FleekHQ/fleek/issues/1007)) ([a3cf51d](https://github.com/FleekHQ/fleek/commit/a3cf51d86beb8368aa2e41741aedb9631495d5b3))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** Add jsdoc into JS configuration file with type declaration imported from Fleek CLI ([#1008](https://github.com/FleekHQ/fleek/issues/1008)) ([fc2f90f](https://github.com/FleekHQ/fleek/commit/fc2f90fc62873af384fd844f9e2bb741fc276fa0))
- **cli:** added CID into IPNS table ([#887](https://github.com/FleekHQ/fleek/issues/887)) ([2fc3999](https://github.com/FleekHQ/fleek/commit/2fc39999770f7320fda8f72a4908a56c483db90d))
- **cli:** command to list projects, option name to switch or create … ([#1145](https://github.com/FleekHQ/fleek/issues/1145)) ([9c9a794](https://github.com/FleekHQ/fleek/commit/9c9a794b56b2795ac3a970a0dab4692a88a44929))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** domains verify command flow improvement ([#964](https://github.com/FleekHQ/fleek/issues/964)) ([d478851](https://github.com/FleekHQ/fleek/commit/d47885143ab27965665368462e2062a16c0934d5))
- **cli:** fix tsc lint ([27c8630](https://github.com/FleekHQ/fleek/commit/27c8630a236c2488b7e72859220d61fd38fcb497))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** include pgw name and slug in parentheses ([#1205](https://github.com/FleekHQ/fleek/issues/1205)) ([9777615](https://github.com/FleekHQ/fleek/commit/9777615a21cce0946499c2213026ad88d9f62d42))
- **cli:** more universal loading of configuration (.json/.ts/.js) ([#955](https://github.com/FleekHQ/fleek/issues/955)) ([fc27a2d](https://github.com/FleekHQ/fleek/commit/fc27a2d3a7b5cb6e047bc07ff200e277649ca22a))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** show warning if Node.js is out of supported range ([#963](https://github.com/FleekHQ/fleek/issues/963)) ([cad0fee](https://github.com/FleekHQ/fleek/commit/cad0fee815d54fdbb8b6ae8cd74bf947d3f26e08))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- ENS Integration ([#1045](https://github.com/FleekHQ/fleek/issues/1045)) ([d0cf4b0](https://github.com/FleekHQ/fleek/commit/d0cf4b02aeabba6176d32dd38506e06a8f8159f4))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- fix lint error ([05f5b02](https://github.com/FleekHQ/fleek/commit/05f5b02c6db2d37f5e8e61990d516b8865cf77c8))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- gateway detail ([#1168](https://github.com/FleekHQ/fleek/issues/1168)) ([ed6398a](https://github.com/FleekHQ/fleek/commit/ed6398a5ad5cbfd119b8f9a2978170c8a78f69c4))
- **graphql:** add authScopes with specific Fleek errors everywhere they are missing ([#1014](https://github.com/FleekHQ/fleek/issues/1014)) ([808c747](https://github.com/FleekHQ/fleek/commit/808c7474673df64c628f2ee9a6d85ff71570e145))
- **graphql:** from mutation to query to obtain PAT from verification session ([#912](https://github.com/FleekHQ/fleek/issues/912)) ([ee8fc73](https://github.com/FleekHQ/fleek/commit/ee8fc73bc8c55d179c4880150218f0e153ece563))
- **graphql:** integration tests with prisma ([#790](https://github.com/FleekHQ/fleek/issues/790)) ([fbf2a61](https://github.com/FleekHQ/fleek/commit/fbf2a616bc32b9233d73fcb65453ce089c7aafe8))
- **graphql:** queries mutations schema for pgw ([#987](https://github.com/FleekHQ/fleek/issues/987)) ([ef4a14d](https://github.com/FleekHQ/fleek/commit/ef4a14d5b5d6c24f7eea31b5fdb957e4aa4d5b80))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- sdk tests ([#1176](https://github.com/FleekHQ/fleek/issues/1176)) ([201e038](https://github.com/FleekHQ/fleek/commit/201e038a07d6c88e7f3ed424ce4a3898cf6e99f0))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- site ipns improvements ([#988](https://github.com/FleekHQ/fleek/issues/988)) ([3e6913f](https://github.com/FleekHQ/fleek/commit/3e6913f3fd72775a6114ffbca652425efc39c23b))
- **sites-prisma, graphql, sdk, cli:** add a IpnsRecord for a Site and automatic publishing during deployment ([#925](https://github.com/FleekHQ/fleek/issues/925)) ([ebdd18f](https://github.com/FleekHQ/fleek/commit/ebdd18ff27082f4f7857ebc0d95cf86288f2887f))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- **ui:** logo in navigation bar is only symbol without the Fleek ([#937](https://github.com/FleekHQ/fleek/issues/937)) ([27e246e](https://github.com/FleekHQ/fleek/commit/27e246e44228d21db222156971a2512c1672669b))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- cli sites ci location bug ([#895](https://github.com/FleekHQ/fleek/issues/895)) ([2908ec5](https://github.com/FleekHQ/fleek/commit/2908ec5d6bea33a171eb1e0e2e7c717d4011498e))
- **cli:** add ENS to run.ts ([4c4c188](https://github.com/FleekHQ/fleek/commit/4c4c188c46a57a408415d639d59f20193e77a730))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** command `ipns delete` - move confirmation prompt after record selection prompt ([#893](https://github.com/FleekHQ/fleek/issues/893)) ([491b3be](https://github.com/FleekHQ/fleek/commit/491b3be11a7257727488fc42409dd7fcfcf021ff))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** Don't continue with not-existing choice in selectPrompt ([#1161](https://github.com/FleekHQ/fleek/issues/1161)) ([c96c216](https://github.com/FleekHQ/fleek/commit/c96c216693d32188b2275270c2bec92fdd8e7e77))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output error via output or throw, not both ([#889](https://github.com/FleekHQ/fleek/issues/889)) ([500b3aa](https://github.com/FleekHQ/fleek/commit/500b3aa6d5e2075b69e43ed2d1e16610652a7990))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** project name validation message ([2a5e8ff](https://github.com/FleekHQ/fleek/commit/2a5e8ffecad512de1a87267299a6e99a8e39761b))
- **cli:** query `createPersonalAccessTokenFromVerificationSession` is now mutation ([#971](https://github.com/FleekHQ/fleek/issues/971)) ([30be735](https://github.com/FleekHQ/fleek/commit/30be73598349df925c6c6f3a8ab118e0d4a45801))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in `list` commands description ([0278505](https://github.com/FleekHQ/fleek/commit/0278505f9f997a398907c19daf761c814ebbe80c))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- **cli:** use existing site or create ([#885](https://github.com/FleekHQ/fleek/issues/885)) ([85915c9](https://github.com/FleekHQ/fleek/commit/85915c938acdcdddcf311084ed2438a59016dd4e))
- **cli:** use older FS constants object ([#978](https://github.com/FleekHQ/fleek/issues/978)) ([d7ce92c](https://github.com/FleekHQ/fleek/commit/d7ce92c82eba8e2fd0f949e8eabf89cb5f82db49))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- ENS CLI post-QA ([#1225](https://github.com/FleekHQ/fleek/issues/1225)) ([3329b96](https://github.com/FleekHQ/fleek/commit/3329b9656bf0f7a8004765ac1352e01f9c8ea456))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- hash prompt in `ipns publish` command in cli, fix SDK ipns client ([#892](https://github.com/FleekHQ/fleek/issues/892)) ([eb40258](https://github.com/FleekHQ/fleek/commit/eb402586bb39a9b7cdd1a6f933044f60d2bd4849))
- ipfs sdk ([#1165](https://github.com/FleekHQ/fleek/issues/1165)) ([37e72b6](https://github.com/FleekHQ/fleek/commit/37e72b62fd29d4cce90625926d0c7d71e5897bc1))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- release cli deploy ([#975](https://github.com/FleekHQ/fleek/issues/975)) ([0c08844](https://github.com/FleekHQ/fleek/commit/0c088448d9fdcb6af4caf42dbb0aebc6beaf7ed7))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))

### Miscellaneous Chores

- **cli, sdk:** release 0.4.0 ([61edcd4](https://github.com/FleekHQ/fleek/commit/61edcd4acd72e1a47f1166333c0bb8d9e75c216f))
- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))
- release 0.3.0 ([#904](https://github.com/FleekHQ/fleek/issues/904)) ([d45103c](https://github.com/FleekHQ/fleek/commit/d45103caafa8991e2d66da773e3805a6d1d58c3f))
- release 0.3.0-rc.1 ([#900](https://github.com/FleekHQ/fleek/issues/900)) ([17493ed](https://github.com/FleekHQ/fleek/commit/17493edbbf11aa6b69dd005b85eb8f3460806b42))
- release 0.5.0 ([#1169](https://github.com/FleekHQ/fleek/issues/1169)) ([df8e574](https://github.com/FleekHQ/fleek/commit/df8e574c8efbe896023d9b74fc057989744f3b82))
- release 0.6.0. ([#1238](https://github.com/FleekHQ/fleek/issues/1238)) ([11a5bbd](https://github.com/FleekHQ/fleek/commit/11a5bbd7ffef6b4082d2ec0ea7bca50d84876508))

## 0.4.0 (2023-05-31)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- add metadata and Site relation for Pins ([#961](https://github.com/FleekHQ/fleek/issues/961)) ([102e1c3](https://github.com/FleekHQ/fleek/commit/102e1c3a9557367adda157d5b19b56adc94f00da))
- Added SDK baseline, authentication SDK & CLI Login Feature ([#77](https://github.com/FleekHQ/fleek/issues/77)) ([6a83b71](https://github.com/FleekHQ/fleek/commit/6a83b7140f2458f8ef2410919d2f4557e4e320a0))
- application credentials cli ([#1007](https://github.com/FleekHQ/fleek/issues/1007)) ([a3cf51d](https://github.com/FleekHQ/fleek/commit/a3cf51d86beb8368aa2e41741aedb9631495d5b3))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** Add jsdoc into JS configuration file with type declaration imported from Fleek CLI ([#1008](https://github.com/FleekHQ/fleek/issues/1008)) ([fc2f90f](https://github.com/FleekHQ/fleek/commit/fc2f90fc62873af384fd844f9e2bb741fc276fa0))
- **cli:** added CID into IPNS table ([#887](https://github.com/FleekHQ/fleek/issues/887)) ([2fc3999](https://github.com/FleekHQ/fleek/commit/2fc39999770f7320fda8f72a4908a56c483db90d))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** domains verify command flow improvement ([#964](https://github.com/FleekHQ/fleek/issues/964)) ([d478851](https://github.com/FleekHQ/fleek/commit/d47885143ab27965665368462e2062a16c0934d5))
- **cli:** fix tsc lint ([27c8630](https://github.com/FleekHQ/fleek/commit/27c8630a236c2488b7e72859220d61fd38fcb497))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** more universal loading of configuration (.json/.ts/.js) ([#955](https://github.com/FleekHQ/fleek/issues/955)) ([fc27a2d](https://github.com/FleekHQ/fleek/commit/fc27a2d3a7b5cb6e047bc07ff200e277649ca22a))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** show warning if Node.js is out of supported range ([#963](https://github.com/FleekHQ/fleek/issues/963)) ([cad0fee](https://github.com/FleekHQ/fleek/commit/cad0fee815d54fdbb8b6ae8cd74bf947d3f26e08))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- fix lint error ([05f5b02](https://github.com/FleekHQ/fleek/commit/05f5b02c6db2d37f5e8e61990d516b8865cf77c8))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- **graphql:** from mutation to query to obtain PAT from verification session ([#912](https://github.com/FleekHQ/fleek/issues/912)) ([ee8fc73](https://github.com/FleekHQ/fleek/commit/ee8fc73bc8c55d179c4880150218f0e153ece563))
- **graphql:** integration tests with prisma ([#790](https://github.com/FleekHQ/fleek/issues/790)) ([fbf2a61](https://github.com/FleekHQ/fleek/commit/fbf2a616bc32b9233d73fcb65453ce089c7aafe8))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- ipfs storage ([#105](https://github.com/FleekHQ/fleek/issues/105)) ([76ee449](https://github.com/FleekHQ/fleek/commit/76ee44960b3d44368dafe1833623e31fca9eff88))
- IPNS CLI 🌎🧑‍💻 ([#103](https://github.com/FleekHQ/fleek/issues/103)) ([8f5194c](https://github.com/FleekHQ/fleek/commit/8f5194cdbd3f4e1db16362dc1886a9f18c88616f))
- IPNS SDK 🔨🌎 ([#123](https://github.com/FleekHQ/fleek/issues/123)) ([bf44f78](https://github.com/FleekHQ/fleek/commit/bf44f7872cedfb8c7dc32e5b60a7d7edded99c5e))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- site ipns improvements ([#988](https://github.com/FleekHQ/fleek/issues/988)) ([3e6913f](https://github.com/FleekHQ/fleek/commit/3e6913f3fd72775a6114ffbca652425efc39c23b))
- **sites-prisma, graphql, sdk, cli:** add a IpnsRecord for a Site and automatic publishing during deployment ([#925](https://github.com/FleekHQ/fleek/issues/925)) ([ebdd18f](https://github.com/FleekHQ/fleek/commit/ebdd18ff27082f4f7857ebc0d95cf86288f2887f))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- **ui:** logo in navigation bar is only symbol without the Fleek ([#937](https://github.com/FleekHQ/fleek/issues/937)) ([27e246e](https://github.com/FleekHQ/fleek/commit/27e246e44228d21db222156971a2512c1672669b))
- workflow / enabled turbo cache ([#148](https://github.com/FleekHQ/fleek/issues/148)) ([d00bf87](https://github.com/FleekHQ/fleek/commit/d00bf87564c9b8748041704c052b183645f8839c))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- cli sites ci location bug ([#895](https://github.com/FleekHQ/fleek/issues/895)) ([2908ec5](https://github.com/FleekHQ/fleek/commit/2908ec5d6bea33a171eb1e0e2e7c717d4011498e))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** command `ipns delete` - move confirmation prompt after record selection prompt ([#893](https://github.com/FleekHQ/fleek/issues/893)) ([491b3be](https://github.com/FleekHQ/fleek/commit/491b3be11a7257727488fc42409dd7fcfcf021ff))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output error via output or throw, not both ([#889](https://github.com/FleekHQ/fleek/issues/889)) ([500b3aa](https://github.com/FleekHQ/fleek/commit/500b3aa6d5e2075b69e43ed2d1e16610652a7990))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** query `createPersonalAccessTokenFromVerificationSession` is now mutation ([#971](https://github.com/FleekHQ/fleek/issues/971)) ([30be735](https://github.com/FleekHQ/fleek/commit/30be73598349df925c6c6f3a8ab118e0d4a45801))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- **cli:** use existing site or create ([#885](https://github.com/FleekHQ/fleek/issues/885)) ([85915c9](https://github.com/FleekHQ/fleek/commit/85915c938acdcdddcf311084ed2438a59016dd4e))
- **cli:** use older FS constants object ([#978](https://github.com/FleekHQ/fleek/issues/978)) ([d7ce92c](https://github.com/FleekHQ/fleek/commit/d7ce92c82eba8e2fd0f949e8eabf89cb5f82db49))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- hash prompt in `ipns publish` command in cli, fix SDK ipns client ([#892](https://github.com/FleekHQ/fleek/issues/892)) ([eb40258](https://github.com/FleekHQ/fleek/commit/eb402586bb39a9b7cdd1a6f933044f60d2bd4849))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- release cli deploy ([#975](https://github.com/FleekHQ/fleek/issues/975)) ([0c08844](https://github.com/FleekHQ/fleek/commit/0c088448d9fdcb6af4caf42dbb0aebc6beaf7ed7))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))

### Miscellaneous Chores

- **cli, sdk:** release 0.4.0 ([61edcd4](https://github.com/FleekHQ/fleek/commit/61edcd4acd72e1a47f1166333c0bb8d9e75c216f))
- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))
- release 0.3.0 ([#904](https://github.com/FleekHQ/fleek/issues/904)) ([d45103c](https://github.com/FleekHQ/fleek/commit/d45103caafa8991e2d66da773e3805a6d1d58c3f))
- release 0.3.0-rc.1 ([#900](https://github.com/FleekHQ/fleek/issues/900)) ([17493ed](https://github.com/FleekHQ/fleek/commit/17493edbbf11aa6b69dd005b85eb8f3460806b42))

## 0.3.0 (2023-04-17)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- Added SDK baseline, authentication SDK & CLI Login Feature ([#77](https://github.com/FleekHQ/fleek/issues/77)) ([6a83b71](https://github.com/FleekHQ/fleek/commit/6a83b7140f2458f8ef2410919d2f4557e4e320a0))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** added CID into IPNS table ([#887](https://github.com/FleekHQ/fleek/issues/887)) ([2fc3999](https://github.com/FleekHQ/fleek/commit/2fc39999770f7320fda8f72a4908a56c483db90d))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** fix tsc lint ([27c8630](https://github.com/FleekHQ/fleek/commit/27c8630a236c2488b7e72859220d61fd38fcb497))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- fix lint error ([05f5b02](https://github.com/FleekHQ/fleek/commit/05f5b02c6db2d37f5e8e61990d516b8865cf77c8))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- **graphql:** integration tests with prisma ([#790](https://github.com/FleekHQ/fleek/issues/790)) ([fbf2a61](https://github.com/FleekHQ/fleek/commit/fbf2a616bc32b9233d73fcb65453ce089c7aafe8))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- ipfs storage ([#105](https://github.com/FleekHQ/fleek/issues/105)) ([76ee449](https://github.com/FleekHQ/fleek/commit/76ee44960b3d44368dafe1833623e31fca9eff88))
- IPNS CLI 🌎🧑‍💻 ([#103](https://github.com/FleekHQ/fleek/issues/103)) ([8f5194c](https://github.com/FleekHQ/fleek/commit/8f5194cdbd3f4e1db16362dc1886a9f18c88616f))
- IPNS SDK 🔨🌎 ([#123](https://github.com/FleekHQ/fleek/issues/123)) ([bf44f78](https://github.com/FleekHQ/fleek/commit/bf44f7872cedfb8c7dc32e5b60a7d7edded99c5e))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- workflow / enabled turbo cache ([#148](https://github.com/FleekHQ/fleek/issues/148)) ([d00bf87](https://github.com/FleekHQ/fleek/commit/d00bf87564c9b8748041704c052b183645f8839c))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- cli sites ci location bug ([#895](https://github.com/FleekHQ/fleek/issues/895)) ([2908ec5](https://github.com/FleekHQ/fleek/commit/2908ec5d6bea33a171eb1e0e2e7c717d4011498e))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** command `ipns delete` - move confirmation prompt after record selection prompt ([#893](https://github.com/FleekHQ/fleek/issues/893)) ([491b3be](https://github.com/FleekHQ/fleek/commit/491b3be11a7257727488fc42409dd7fcfcf021ff))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output error via output or throw, not both ([#889](https://github.com/FleekHQ/fleek/issues/889)) ([500b3aa](https://github.com/FleekHQ/fleek/commit/500b3aa6d5e2075b69e43ed2d1e16610652a7990))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- **cli:** use existing site or create ([#885](https://github.com/FleekHQ/fleek/issues/885)) ([85915c9](https://github.com/FleekHQ/fleek/commit/85915c938acdcdddcf311084ed2438a59016dd4e))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- hash prompt in `ipns publish` command in cli, fix SDK ipns client ([#892](https://github.com/FleekHQ/fleek/issues/892)) ([eb40258](https://github.com/FleekHQ/fleek/commit/eb402586bb39a9b7cdd1a6f933044f60d2bd4849))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))

### Miscellaneous Chores

- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))
- release 0.3.0 ([#904](https://github.com/FleekHQ/fleek/issues/904)) ([d45103c](https://github.com/FleekHQ/fleek/commit/d45103caafa8991e2d66da773e3805a6d1d58c3f))
- release 0.3.0-rc.1 ([#900](https://github.com/FleekHQ/fleek/issues/900)) ([17493ed](https://github.com/FleekHQ/fleek/commit/17493edbbf11aa6b69dd005b85eb8f3460806b42))

## 0.3.0-rc.1 (2023-04-17)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- Added SDK baseline, authentication SDK & CLI Login Feature ([#77](https://github.com/FleekHQ/fleek/issues/77)) ([6a83b71](https://github.com/FleekHQ/fleek/commit/6a83b7140f2458f8ef2410919d2f4557e4e320a0))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** added CID into IPNS table ([#887](https://github.com/FleekHQ/fleek/issues/887)) ([2fc3999](https://github.com/FleekHQ/fleek/commit/2fc39999770f7320fda8f72a4908a56c483db90d))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** fix tsc lint ([27c8630](https://github.com/FleekHQ/fleek/commit/27c8630a236c2488b7e72859220d61fd38fcb497))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- fix lint error ([05f5b02](https://github.com/FleekHQ/fleek/commit/05f5b02c6db2d37f5e8e61990d516b8865cf77c8))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- **graphql:** integration tests with prisma ([#790](https://github.com/FleekHQ/fleek/issues/790)) ([fbf2a61](https://github.com/FleekHQ/fleek/commit/fbf2a616bc32b9233d73fcb65453ce089c7aafe8))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- ipfs storage ([#105](https://github.com/FleekHQ/fleek/issues/105)) ([76ee449](https://github.com/FleekHQ/fleek/commit/76ee44960b3d44368dafe1833623e31fca9eff88))
- IPNS CLI 🌎🧑‍💻 ([#103](https://github.com/FleekHQ/fleek/issues/103)) ([8f5194c](https://github.com/FleekHQ/fleek/commit/8f5194cdbd3f4e1db16362dc1886a9f18c88616f))
- IPNS SDK 🔨🌎 ([#123](https://github.com/FleekHQ/fleek/issues/123)) ([bf44f78](https://github.com/FleekHQ/fleek/commit/bf44f7872cedfb8c7dc32e5b60a7d7edded99c5e))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- workflow / enabled turbo cache ([#148](https://github.com/FleekHQ/fleek/issues/148)) ([d00bf87](https://github.com/FleekHQ/fleek/commit/d00bf87564c9b8748041704c052b183645f8839c))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- cli sites ci location bug ([#895](https://github.com/FleekHQ/fleek/issues/895)) ([2908ec5](https://github.com/FleekHQ/fleek/commit/2908ec5d6bea33a171eb1e0e2e7c717d4011498e))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** command `ipns delete` - move confirmation prompt after record selection prompt ([#893](https://github.com/FleekHQ/fleek/issues/893)) ([491b3be](https://github.com/FleekHQ/fleek/commit/491b3be11a7257727488fc42409dd7fcfcf021ff))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output error via output or throw, not both ([#889](https://github.com/FleekHQ/fleek/issues/889)) ([500b3aa](https://github.com/FleekHQ/fleek/commit/500b3aa6d5e2075b69e43ed2d1e16610652a7990))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- **cli:** use existing site or create ([#885](https://github.com/FleekHQ/fleek/issues/885)) ([85915c9](https://github.com/FleekHQ/fleek/commit/85915c938acdcdddcf311084ed2438a59016dd4e))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- hash prompt in `ipns publish` command in cli, fix SDK ipns client ([#892](https://github.com/FleekHQ/fleek/issues/892)) ([eb40258](https://github.com/FleekHQ/fleek/commit/eb402586bb39a9b7cdd1a6f933044f60d2bd4849))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))

### Miscellaneous Chores

- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))
- release 0.3.0-rc.1 ([#900](https://github.com/FleekHQ/fleek/issues/900)) ([17493ed](https://github.com/FleekHQ/fleek/commit/17493edbbf11aa6b69dd005b85eb8f3460806b42))

## 0.2.2-rc.3 (2023-04-12)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- Added SDK baseline, authentication SDK & CLI Login Feature ([#77](https://github.com/FleekHQ/fleek/issues/77)) ([6a83b71](https://github.com/FleekHQ/fleek/commit/6a83b7140f2458f8ef2410919d2f4557e4e320a0))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- ipfs storage ([#105](https://github.com/FleekHQ/fleek/issues/105)) ([76ee449](https://github.com/FleekHQ/fleek/commit/76ee44960b3d44368dafe1833623e31fca9eff88))
- IPNS CLI 🌎🧑‍💻 ([#103](https://github.com/FleekHQ/fleek/issues/103)) ([8f5194c](https://github.com/FleekHQ/fleek/commit/8f5194cdbd3f4e1db16362dc1886a9f18c88616f))
- IPNS SDK 🔨🌎 ([#123](https://github.com/FleekHQ/fleek/issues/123)) ([bf44f78](https://github.com/FleekHQ/fleek/commit/bf44f7872cedfb8c7dc32e5b60a7d7edded99c5e))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- workflow / enabled turbo cache ([#148](https://github.com/FleekHQ/fleek/issues/148)) ([d00bf87](https://github.com/FleekHQ/fleek/commit/d00bf87564c9b8748041704c052b183645f8839c))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))

### Miscellaneous Chores

- release 0.2.2-rc.3 ([#869](https://github.com/FleekHQ/fleek/issues/869)) ([c04c97c](https://github.com/FleekHQ/fleek/commit/c04c97cc55ef3c37ce170335e9b7e55d34756f67))

## 0.2.2-rc.2 (2023-04-11)

### Features

- /packages/cli/index.ts move to /packages/cli/run.ts ([#666](https://github.com/FleekHQ/fleek/issues/666)) ([63588ad](https://github.com/FleekHQ/fleek/commit/63588ad87d042d8908eb412d3e2e0f571a41c20f))
- add check of latest version on every SDK command ([#580](https://github.com/FleekHQ/fleek/issues/580)) ([b798df6](https://github.com/FleekHQ/fleek/commit/b798df68916f7d6023bed4ef25958dae1582f7e7))
- add dispatch to missing GA workflows ([#288](https://github.com/FleekHQ/fleek/issues/288)) ([af779db](https://github.com/FleekHQ/fleek/commit/af779db991b3e3063eaa492fca76b93a47d599ae))
- add ipfs gateway url to succes message ([#397](https://github.com/FleekHQ/fleek/issues/397)) ([d58f97a](https://github.com/FleekHQ/fleek/commit/d58f97a33c26a76518e03f55cb5ce810697e079f))
- add linter rule to enforce newline after block-like statements ([#831](https://github.com/FleekHQ/fleek/issues/831)) ([f3d1e1e](https://github.com/FleekHQ/fleek/commit/f3d1e1e52f033e634f02b598d0ccd20561500e49))
- Added SDK baseline, authentication SDK & CLI Login Feature ([#77](https://github.com/FleekHQ/fleek/issues/77)) ([6a83b71](https://github.com/FleekHQ/fleek/commit/6a83b7140f2458f8ef2410919d2f4557e4e320a0))
- auth-graphql duplication ([#697](https://github.com/FleekHQ/fleek/issues/697)) ([ac1194b](https://github.com/FleekHQ/fleek/commit/ac1194b9cfb6f40c839fc9e574a5452a4dce1570))
- **auth-graphql, sdk, cli:** Management of personal access tokens in auth-graphql, SDK and CLI ([#582](https://github.com/FleekHQ/fleek/issues/582)) ([d8952f3](https://github.com/FleekHQ/fleek/commit/d8952f3df0fcbe8754cdbe4da18a35b2f77bff34))
- **backoffice:** add project list to backoffice ([#583](https://github.com/FleekHQ/fleek/issues/583)) ([d1ed217](https://github.com/FleekHQ/fleek/commit/d1ed217d2f49dba64e3ebab66a34595a13c5df93))
- better messages for cli guards ([#304](https://github.com/FleekHQ/fleek/issues/304)) ([1c50e13](https://github.com/FleekHQ/fleek/commit/1c50e133713fb1b9f0be41d6e7d25d1a9178e524))
- change naming from remove to delete ([#571](https://github.com/FleekHQ/fleek/issues/571)) ([865f17e](https://github.com/FleekHQ/fleek/commit/865f17ea06881f24af37e33fffca2cac31feaa14))
- check if yaml file exists and ask if user wants to override ([#472](https://github.com/FleekHQ/fleek/issues/472)) ([1134988](https://github.com/FleekHQ/fleek/commit/1134988cb12ac54443cd1b9674a2822b17d575f8))
- CLI output package ([#169](https://github.com/FleekHQ/fleek/issues/169)) ([5f723ea](https://github.com/FleekHQ/fleek/commit/5f723eacae64ecc44e1526abe2df0e7c6a44f4fd))
- CLI sites guard ([#377](https://github.com/FleekHQ/fleek/issues/377)) ([8dfd6e4](https://github.com/FleekHQ/fleek/commit/8dfd6e457957d270c362e4c5e5eff4c966fc9b50))
- **cli:** add base URL to IPNS and IPFS hash ([#307](https://github.com/FleekHQ/fleek/issues/307)) ([d160c82](https://github.com/FleekHQ/fleek/commit/d160c82110e7a0025b2f5ff570658e4ca212a466))
- **cli:** delete domain ([#585](https://github.com/FleekHQ/fleek/issues/585)) ([fc85b59](https://github.com/FleekHQ/fleek/commit/fc85b594434b65954bcb55cb39000853a7f501f5))
- **cli:** generate yaml for Github actions provider ([#249](https://github.com/FleekHQ/fleek/issues/249)) ([00f482e](https://github.com/FleekHQ/fleek/commit/00f482eed2caa7e1b51f041a57319a84d4191a6d))
- **cli:** improve beta warning message regarding beta version of cli ([#399](https://github.com/FleekHQ/fleek/issues/399)) ([3d2773a](https://github.com/FleekHQ/fleek/commit/3d2773afb08e8cca14977c47ab3252a1632486f4))
- **cli:** in CI use config PAT and projectID from variable in CI ([#451](https://github.com/FleekHQ/fleek/issues/451)) ([f01eb92](https://github.com/FleekHQ/fleek/commit/f01eb92984dceb8dd668ce9c185befcd247af869))
- **cli:** print empty line before table and after, added tests for every method in output ([#484](https://github.com/FleekHQ/fleek/issues/484)) ([07e7dcd](https://github.com/FleekHQ/fleek/commit/07e7dcd249a9159d2c55d6d3f09ac2f5bb69e77e))
- **cli:** prompt wrappers ([#779](https://github.com/FleekHQ/fleek/issues/779)) ([d7c0a7a](https://github.com/FleekHQ/fleek/commit/d7c0a7acccc0c15d2afcccf74dddd0b826228c62))
- **cli:** request install command ([#501](https://github.com/FleekHQ/fleek/issues/501)) ([b0c226e](https://github.com/FleekHQ/fleek/commit/b0c226e74b87dc1335ef95912a6b8121206e5f69))
- **cli:** respect exit code from build command ([#753](https://github.com/FleekHQ/fleek/issues/753)) ([4071c72](https://github.com/FleekHQ/fleek/commit/4071c723b73a7349a0fb780d44e0b1d72fb732f2))
- **cli:** scope guards ([#291](https://github.com/FleekHQ/fleek/issues/291)) ([150c429](https://github.com/FleekHQ/fleek/commit/150c42929b83ffbaa19b09bfffc8c92e755202ff))
- **cli:** show Github Actions secrets as CLI output ([#469](https://github.com/FleekHQ/fleek/issues/469)) ([866a60c](https://github.com/FleekHQ/fleek/commit/866a60c09086e2f073e8c0f4058992527f54078d))
- **cli:** sites --config option ([#559](https://github.com/FleekHQ/fleek/issues/559)) ([628cb73](https://github.com/FleekHQ/fleek/commit/628cb732c243fbc5f1235323d9663e7a20648675))
- custom domains ([#447](https://github.com/FleekHQ/fleek/issues/447)) ([6ce258c](https://github.com/FleekHQ/fleek/commit/6ce258c2b25f9f54caecda1ab8cd1f0a377f5a62))
- empty line before return ([#190](https://github.com/FleekHQ/fleek/issues/190)) ([77c8468](https://github.com/FleekHQ/fleek/commit/77c8468b1065a772ad2bd0af802514e36b2b67d5))
- enable sites in cli ([#370](https://github.com/FleekHQ/fleek/issues/370)) ([04d10a8](https://github.com/FleekHQ/fleek/commit/04d10a80305a1bba742231e41ea739599bf44e2d))
- **errors:** better and more universal error handling ([#660](https://github.com/FleekHQ/fleek/issues/660)) ([4574a80](https://github.com/FleekHQ/fleek/commit/4574a8001128ebf920eb827ea801badbdb8728f3))
- eslint valid type names ([#557](https://github.com/FleekHQ/fleek/issues/557)) ([ffac3e1](https://github.com/FleekHQ/fleek/commit/ffac3e1f95ef05b0bbb7eed878f13d8121562bc4))
- **eslint:** added curly rule to linter, fixed non-curly returns and throws ([#505](https://github.com/FleekHQ/fleek/issues/505)) ([087d3c0](https://github.com/FleekHQ/fleek/commit/087d3c0f0e71da687d42e7468af684923e244ce5))
- **eslint:** disable interface and force type in linter ([#476](https://github.com/FleekHQ/fleek/issues/476)) ([bb25d8d](https://github.com/FleekHQ/fleek/commit/bb25d8ddbd7077d4fae4435e93d6ccbf37139de8))
- **eslint:** forbid let usage ([#467](https://github.com/FleekHQ/fleek/issues/467)) ([2365ccd](https://github.com/FleekHQ/fleek/commit/2365ccd8faddbbb55646d757a6b4f412216eba07))
- format command ([b73c5e9](https://github.com/FleekHQ/fleek/commit/b73c5e9f4d932579f77ea0bafcb00b13da2b5b1c))
- hide not finished services in CLI ([#275](https://github.com/FleekHQ/fleek/issues/275)) ([ca5de87](https://github.com/FleekHQ/fleek/commit/ca5de876c3e5fdf2dd5bc79f00da6f0fab7ad3a0))
- implement back office with interval, updated turborepo version, prisma packages does not require doppler for build ([#248](https://github.com/FleekHQ/fleek/issues/248)) ([1edf2a6](https://github.com/FleekHQ/fleek/commit/1edf2a6646edf86d4495a4db870e16e93f14dfac))
- ipfs check file existence in cli ([#263](https://github.com/FleekHQ/fleek/issues/263)) ([8c46629](https://github.com/FleekHQ/fleek/commit/8c466291396c9d7e6537a1e38cc2bf429c26ba78))
- ipfs storage ([#105](https://github.com/FleekHQ/fleek/issues/105)) ([76ee449](https://github.com/FleekHQ/fleek/commit/76ee44960b3d44368dafe1833623e31fca9eff88))
- IPNS CLI 🌎🧑‍💻 ([#103](https://github.com/FleekHQ/fleek/issues/103)) ([8f5194c](https://github.com/FleekHQ/fleek/commit/8f5194cdbd3f4e1db16362dc1886a9f18c88616f))
- IPNS SDK 🔨🌎 ([#123](https://github.com/FleekHQ/fleek/issues/123)) ([bf44f78](https://github.com/FleekHQ/fleek/commit/bf44f7872cedfb8c7dc32e5b60a7d7edded99c5e))
- IPNS service improvement ([#215](https://github.com/FleekHQ/fleek/issues/215)) ([f10c656](https://github.com/FleekHQ/fleek/commit/f10c6565f39b7bdbe2d35b4dfa70dc0078468fa8))
- list sites ([#435](https://github.com/FleekHQ/fleek/issues/435)) ([ee75cd8](https://github.com/FleekHQ/fleek/commit/ee75cd85319c116b4b8f426bfc4f0941a43a4186))
- Login with wallet frontend ([#100](https://github.com/FleekHQ/fleek/issues/100)) ([1f34441](https://github.com/FleekHQ/fleek/commit/1f3444158836303bfa371974d0d197ca23d9f696))
- minor updates on pat cli flow ([#663](https://github.com/FleekHQ/fleek/issues/663)) ([9a43324](https://github.com/FleekHQ/fleek/commit/9a43324e950ebbe34127b47106f32b256ff6aa2d))
- PAT name support ([#688](https://github.com/FleekHQ/fleek/issues/688)) ([a4e4110](https://github.com/FleekHQ/fleek/commit/a4e4110c3af2ee2c0e9e967dd9d011dff1022aba))
- pat token serialization ([#690](https://github.com/FleekHQ/fleek/issues/690)) ([40ddb8a](https://github.com/FleekHQ/fleek/commit/40ddb8a6781b14578d10fc7f9e5b06acefa26f5d))
- rename workspace to fleekxyz ([#182](https://github.com/FleekHQ/fleek/issues/182)) ([aa40ba3](https://github.com/FleekHQ/fleek/commit/aa40ba3555de4b89a102fe2e84442e2e28912a79))
- **sdk, cli:** SDK `ipfs` client exposes `getIpfsFiles` ([#742](https://github.com/FleekHQ/fleek/issues/742)) ([b57c6e3](https://github.com/FleekHQ/fleek/commit/b57c6e331c93375a499fe691ab975669b5dc64f8))
- **sdk:** Browser Support ([#385](https://github.com/FleekHQ/fleek/issues/385)) ([a07416a](https://github.com/FleekHQ/fleek/commit/a07416af9130e1869b1d345205bf19faf4314b78))
- Setup and deploy site ([#161](https://github.com/FleekHQ/fleek/issues/161)) ([adf95ce](https://github.com/FleekHQ/fleek/commit/adf95ce5a681fcb66c00565fc9f7a270fc9ef8d2))
- show warning every cli call ([#281](https://github.com/FleekHQ/fleek/issues/281)) ([a0d5e1a](https://github.com/FleekHQ/fleek/commit/a0d5e1af4f1828079e7e3d18db4435b3a36a9fce))
- **ui:** added google analytics and tag manager scripts ([#358](https://github.com/FleekHQ/fleek/issues/358)) ([4688e1e](https://github.com/FleekHQ/fleek/commit/4688e1eefde77cd3d91586bc59d76d2b2b784a67))
- **ui:** added Vertical Tabs, new app layout, added project relation to User ([#819](https://github.com/FleekHQ/fleek/issues/819)) ([2a0921c](https://github.com/FleekHQ/fleek/commit/2a0921c06525bf9421d437d2f5114cc7e04c098c))
- workflow / enabled turbo cache ([#148](https://github.com/FleekHQ/fleek/issues/148)) ([d00bf87](https://github.com/FleekHQ/fleek/commit/d00bf87564c9b8748041704c052b183645f8839c))

### Bug Fixes

- CLI output ([#268](https://github.com/FleekHQ/fleek/issues/268)) ([f03dd3a](https://github.com/FleekHQ/fleek/commit/f03dd3afb33068aea8d646ccc179f7a4f01a3f05))
- **cli:** add onCancel to prompts call to catch SIGINT signal and exit gracefully ([#437](https://github.com/FleekHQ/fleek/issues/437)) ([0ef4c8d](https://github.com/FleekHQ/fleek/commit/0ef4c8dca8fe1768adaaec7e1039f39484f689fb))
- **cli:** added description to service CLI methods ([#357](https://github.com/FleekHQ/fleek/issues/357)) ([eb92b83](https://github.com/FleekHQ/fleek/commit/eb92b83e79df5fec54898cc46d1c57f2e9c82539))
- **cli:** corrected social handle for update message on the cli ([#796](https://github.com/FleekHQ/fleek/issues/796)) ([ca208bd](https://github.com/FleekHQ/fleek/commit/ca208bd2036bd7d5040dee13085f7c5b5cd2c8fc))
- **cli:** domains create description ([#640](https://github.com/FleekHQ/fleek/issues/640)) ([2b206ef](https://github.com/FleekHQ/fleek/commit/2b206ef899cb967dca08368967b1b6e104d025c3))
- **cli:** fix pat typo ([#758](https://github.com/FleekHQ/fleek/issues/758)) ([26d7136](https://github.com/FleekHQ/fleek/commit/26d7136f62871874491b49722d45898276ad6713))
- **cli:** improve sites deploy success message ([#439](https://github.com/FleekHQ/fleek/issues/439)) ([671a455](https://github.com/FleekHQ/fleek/commit/671a45569b078dfa9c52664e370a0869adb71681))
- **cli:** links to sites prompts ([#858](https://github.com/FleekHQ/fleek/issues/858)) ([f949098](https://github.com/FleekHQ/fleek/commit/f94909885aeb592fadfe14cd4fe085251fb7fdd0))
- **cli:** output color ([#653](https://github.com/FleekHQ/fleek/issues/653)) ([3f277ad](https://github.com/FleekHQ/fleek/commit/3f277ad890f56cb1477475ff70783836ad5dc954))
- **cli:** output path for github workflow yaml ([#445](https://github.com/FleekHQ/fleek/issues/445)) ([29ce87d](https://github.com/FleekHQ/fleek/commit/29ce87d9b6900753153230fe097cead3d8239d58))
- **cli:** remove site guard from domains list command ([#777](https://github.com/FleekHQ/fleek/issues/777)) ([697527c](https://github.com/FleekHQ/fleek/commit/697527c8eb01ed8b87b4ab83c2853ee4627d5c3e))
- **cli:** removed automatic open from cli and removed dependency ([#410](https://github.com/FleekHQ/fleek/issues/410)) ([fc9b464](https://github.com/FleekHQ/fleek/commit/fc9b464f54d442d141b42a73407aff15e5f4d853))
- **cli:** typo in generateCiConfiguration description ([#431](https://github.com/FleekHQ/fleek/issues/431)) ([e2ee801](https://github.com/FleekHQ/fleek/commit/e2ee8015651784a8f827f42dd82e5a2e91f495b1))
- do not fail on login when could not open browser ([#303](https://github.com/FleekHQ/fleek/issues/303)) ([978dcf5](https://github.com/FleekHQ/fleek/commit/978dcf532820036631e01a5507d524fd5c2dc4c3))
- **domains:** updated description for cli commands ([#584](https://github.com/FleekHQ/fleek/issues/584)) ([a16aadd](https://github.com/FleekHQ/fleek/commit/a16aadd864e5b8f0904a9f46471b7a62535349e0))
- fleek sites CI output changes ([#463](https://github.com/FleekHQ/fleek/issues/463)) ([8879fa3](https://github.com/FleekHQ/fleek/commit/8879fa3c1cc25b915c9c6074cd8bbe3670b8d5bd))
- ipfs storage api url ([#172](https://github.com/FleekHQ/fleek/issues/172)) ([0cb2a62](https://github.com/FleekHQ/fleek/commit/0cb2a62dc1839db3a21fa59cb5ef7babc0f979ca))
- login in CLI is possible from ubuntu / codespaces ([#320](https://github.com/FleekHQ/fleek/issues/320)) ([e1261ad](https://github.com/FleekHQ/fleek/commit/e1261ad6075111807f026bc4cd221303cd371523))
- **sdk:** expand envs so it can be replaced with strings during build ([#638](https://github.com/FleekHQ/fleek/issues/638)) ([1b718bf](https://github.com/FleekHQ/fleek/commit/1b718bf1bbb35a3743356ba2c980e877ba0c2199))
- **sites:** typo YAML -&gt; Yaml import ([#457](https://github.com/FleekHQ/fleek/issues/457)) ([bd777e6](https://github.com/FleekHQ/fleek/commit/bd777e6c6595c5ee6e46cada6ff6b6c0ab5d6496))
- Stop deploy flow in CLI only when exit status doesn't equal to ZERO ([#632](https://github.com/FleekHQ/fleek/issues/632)) ([fc42ec3](https://github.com/FleekHQ/fleek/commit/fc42ec3dc13ea3e60a7685d5cb30a9edf179868f))
- use wrapWithDirectory option when directory is being uploaded ([#284](https://github.com/FleekHQ/fleek/issues/284)) ([a2d1358](https://github.com/FleekHQ/fleek/commit/a2d13584bacb128f8dd9c1b7a917decf1bfd9dca))
- When deployment takes too longer show user different message ([#654](https://github.com/FleekHQ/fleek/issues/654)) ([d1efb09](https://github.com/FleekHQ/fleek/commit/d1efb094c6cb0915dc35991ff0a31e263af11bc4))
