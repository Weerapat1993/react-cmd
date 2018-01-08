#!/usr/bin/env node

const program = require('commander')
const cmd = require('node-cmd')
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
let pwd

cmd.get('pwd', (err, data, stderr) => {
  pwd = data.replace(new RegExp('\n','g'), '')
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
      MakeRedux(cmdValue, envValue, pwd)
      break
    case 'make:component':
      MakeComponent(cmdValue, envValue, pwd)
      break
    case 'make:feature':
      MakeFeature(cmdValue, envValue, pwd)
      break
    case 'make:page':
      MakePage(cmdValue, envValue, pwd)
      break
    case 'install':
      Install(cmdValue, envValue, pwd)
      break
    default:
      console.log('')
      console.log('  command:', cmdValue, 'is not found.')
      program.help()
  }
})



