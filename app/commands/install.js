const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env = 'material-ui', pwd) => {
  console.log('')
  console.log('Installing ... React Starter Kit [Theme]:', env)
  console.log('')
  const Theme = require(`../themes/${env}`)
  const file = new MakeFile(cmd, env, pwd)
  
  file
    .removeFolder('')
    .createDirectory('')
    .copyFolderTemplate('/config', '/config')
    .copyFolderTemplate('/redux', '/redux')
    .copyFolderTemplate('/utils', '/utils')
    .copyFolderTemplate('/views', '/views')
    .copyFolderTemplate('/lang', '/lang')
    .createFile('/index.js', Theme)
    .copyFile('/registerServiceWorker.js', '/registerServiceWorker.js')
}

module.exports = Install
