const Case = require('case')
const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  
  file
    .copyFolderTemplate('/config', '/config')
    .copyFolderTemplate('/redux', '/redux')
    .copyFolderTemplate('/utils', '/utils')
    .copyFolderTemplate('/views', '/views')
    .copyFile('/index.js', '/index.js')
    .copyFile('/registerServiceWorker.js', '/registerServiceWorker.js')
}

module.exports = Install
