const Case = require('case')
const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  
  file
    .createDirectory('/assets')
    .createDirectory('/assets/images')
    .createDirectory('/components')
    .createFile('/components/index.js', '// ./src/components/index.js')
    .copyFolderTemplate('/config', '/config')
    .copyFolderTemplate('/redux', '/redux')
    .createDirectory('/routes')
    .createDirectory('/styles')
    .createDirectory('/views')
    .copyFolderTemplate('/utils', '/utils')
}

module.exports = Install
