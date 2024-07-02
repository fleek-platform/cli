import { OnResolveArgs, Plugin, PluginBuild } from 'esbuild';

const unsupportedModules = [
  'node:child_process',
  'node:cluster',
  'node:console',
  'node:dgram',
  'node:diagnostics_channel',
  'node:dns',
  'node:fs',
  'node:http2',
  'node:inspector',
  'node:module',
  'node:net',
  'node:os',
  'node:perf_hooks',
  'node:process',
  'node:querystring',
  'node:readline',
  'node:repl',
  'node:sys',
  'node:test',
  'node:timers',
  'node:tls',
  'node:trace_events',
  'node:tty',
  'node:v8',
  'node:vm',
  'node:wasi',
  'node:worker_threads',
];

type ModuleCheckerArgs = {
  unsupportedModulesUsed: Set<string>;
};

export const moduleChecker: (args: ModuleCheckerArgs) => Plugin = (args) => {
  const { unsupportedModulesUsed } = args;

  return {
    name: 'moduleChecker',
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        if (unsupportedModules.includes(args.path) || unsupportedModules.includes(`node:${args.path}`)) {
          unsupportedModulesUsed.add(args.path);
        }

        return null;
      });
    },
  };
};
