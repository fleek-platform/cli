import { Command } from 'commander';
import cmdApplications from './commands/applications/index';
import cmdAuth from './commands/auth/index';
import cmdDomains from './commands/domains/index';
import cmdEns from './commands/ens/index';
import cmdFunctions from './commands/functions/index';
import cmdGateways from './commands/gateways/index';
import cmdIPFS from './commands/ipfs/index';
import cmdIPNS from './commands/ipns/index';
import cmdPAT from './commands/pat/index';
import cmdProjects from './commands/projects/index';
import cmdSites from './commands/sites/index';
import cmdStorage from './commands/storage/index';

import { Output } from './output/Output';
import { t } from './utils/translation';

export type { FleekConfig } from './utils/configuration/types';

const isDebugging = process.argv.includes('--debug');
export const output = new Output({
  stream: process.stdout,
  debug: isDebugging,
});

type InitArgs = {
  version: string;
  parser: (program: Command) => void;
};

const logo = `
                                                
       ad88  88                          88         
      d8"    88                          88         
      88     88                          88         
    MM88MMM  88   ,adPPYba,   ,adPPYba,  88   ,d8   
      88     88  a8P_____88  a8P_____88  88 ,a8"    
      88     88  8PP"""""""  8PP"""""""  8888[      
      88     88  "8b,   ,aa  "8b,   ,aa  88'"Yba,   
      88     88   '"Ybbd8"    '"Ybbd8"   88   'Y8a  

    ⚡ ${t('aboutFleek')} ⚡
`;

export const init = ({ version, parser }: InitArgs) => {
  const program: Command = new Command()
    .name('fleek')
    .option('--debug', t('enableDebugMode'))
    .action(() => program.outputHelp())
    .version(version);

  // TODO: The ascii logo should only be displayed
  // on default command, or general help
  // a minimal version can be used instead
  program.addHelpText('beforeAll', logo).showHelpAfterError();

  type CmdVersionArgs = typeof program;

  const cmdVersion = (program: CmdVersionArgs) =>
    program.command('version').action(() => {
      output.raw(version);
      output.printNewLine();
    });

  // Initialise commands
  const commands = [
    cmdAuth,
    cmdApplications,
    cmdDomains,
    cmdEns,
    cmdGateways,
    cmdIPFS,
    cmdIPNS,
    cmdPAT,
    cmdProjects,
    cmdSites,
    cmdStorage,
    cmdFunctions,
    cmdVersion,
  ];

  for (const cmd of commands) {
    const subCmd = cmd(program);

    // Attach common subcommands
    if (subCmd) {
      // TODO: Identify common subcommands
      // refactor to handle them here
      for (const opt of subCmd.commands) {
        opt.addHelpCommand();
      }
    }
  }

  // Init parser (unawaited)
  parser(program);

  return program;
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const asyncParser = async (program: Command) => {
  try {
    await program.parseAsync(process.argv);

    process.exit(0);
  } catch (err) {
    console.error((err as Error).message || err);

    if ((err as Error).stack) {
      console.error((err as Error).stack);
    }

    process.exit(1);
  }
};
