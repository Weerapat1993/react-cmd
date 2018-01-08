#!/usr/bin/env node

const program = require('commander')
const packageJson = require('./package.json')
const { CMD_NAME } = require('./app/config')
const {
  Install,
  MakeRedux,
  MakeComponent,
  MakeFeature,
  MakePage,
} = require('./app')

let cmdValue
let envValue

program
  .version(packageJson.version)
  .arguments('<cmd> [env]')
  .action((cmd, env) => {
     cmdValue = cmd
     envValue = env
  })

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('')
  console.log('  Examples:')
  console.log('')
  console.log(`    node ${CMD_NAME} install`)
  console.log(`    node ${CMD_NAME} make:redux [name]`)
  console.log(`    node ${CMD_NAME} make:component [name]`)
  console.log(`    node ${CMD_NAME} make:feature [name]`)
  console.log(`    node ${CMD_NAME} make:page [name]`)
  console.log('')
})

program.parse(process.argv)

switch(cmdValue) {
  case 'make:redux':
    MakeRedux(cmdValue, envValue)
    break
  case 'make:component':
    MakeComponent(cmdValue, envValue)
    break
  case 'make:feature':
    MakeFeature(cmdValue, envValue)
    break
  case 'make:page':
    MakePage(cmdValue, envValue)
    break
  case 'install':
    Install(cmdValue, envValue)
    break
  default:
    console.log('')
    console.log('  command:', cmdValue, 'is not found.')
    program.help()
}

