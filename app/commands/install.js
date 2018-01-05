const Case = require('case')
const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  
  file
    .copyFolderTemplate('/assets', '/assets')
    .copyFolderTemplate('/components', '/components')
    .copyFolderTemplate('/config', '/config')
    .copyFolderTemplate('/redux', '/redux')
    .createDirectory('/routes')
    .createDirectory('/styles')
    .createDirectory('/views')
    .copyFolderTemplate('/utils', '/utils')
}

module.exports = Install
