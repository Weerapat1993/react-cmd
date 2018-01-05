#!/usr/bin/env node

const program = require('commander')
const { MakeRedux, Install } = require('./app')
let cmdValue
let envValue

program
  .version('0.1.0')
  .arguments('<cmd> [env]')
  .action((cmd, env) => {
     cmdValue = cmd
     envValue = env
  })

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ custom-help --help');
  console.log('    $ custom-help -h');
  console.log('');
});

program.parse(process.argv)

if (typeof cmdValue === 'undefined') {
   console.error('no command given!')
   process.exit(1)
}

switch(cmdValue) {
  case 'make:redux':
    MakeRedux(cmdValue, envValue)
    break
  case 'install':
    Install(cmdValue, envValue)
    break
  default:
    console.log('command:', cmdValue, 'is not found.')
}

