import { Compiler, WebpackPluginInstance } from 'webpack';

export const unsupportedModules = new Set([
  'assert/strict',
  'child_process',
  'cluster',
  'constants',
  'dgram',
  'diagnostics_channel',
  'dns',
  'fs',
  'fs/promises',
  'http2',
  'inspector',
  'module',
  'net',
  'os',
  'path/posix',
  'path/win32',
  'perf_hooks',
  'process',
  'querystring',
  'readline',
  'repl',
  'stream/promises',
  'stream/web',
  'sys',
  'timers',
  'timers/promises',
  'tls',
  'trace_events',
  'tty',
  'v8',
  'vm',
  'wasi',
  'webcrypto',
  'worker_threads',
  'node:assert/strict',
  'node:child_process',
  'node:cluster',
  'node:constants',
  'node:dgram',
  'node:diagnostics_channel',
  'node:dns',
  'node:fs',
  'node:fs/promises',
  'node:http2',
  'node:inspector',
  'node:module',
  'node:net',
  'node:os',
  'node:path/posix',
  'node:path/win32',
  'node:perf_hooks',
  'node:process',
  'node:querystring',
  'node:readline',
  'node:repl',
  'node:stream/promises',
  'node:stream/web',
  'node:sys',
  'node:timers',
  'node:timers/promises',
  'node:tls',
  'node:trace_events',
  'node:tty',
  'node:v8',
  'node:vm',
  'node:wasi',
  'node:webcrypto',
  'node:worker_threads',
]);

type ModuleCheckerArgs = {
  unsupportedModulesUsed: Set<string>;
};

export const moduleChecker: (args: ModuleCheckerArgs) => WebpackPluginInstance = (args) => {
  const { unsupportedModulesUsed } = args;

  return {
    apply: (compiler: Compiler) => {
      compiler.hooks.normalModuleFactory.tap('ModuleCheckerPlugin', (nmf) => {
        nmf.hooks.beforeResolve.tapAsync('ModuleCheckerPlugin', (resolveData, callback) => {
          const request = resolveData.request;

          if (unsupportedModules.has(request) || unsupportedModules.has(`node:${request}`)) {
            unsupportedModulesUsed.add(request);
          }

          callback();
        });
      });
    },
  };
};
