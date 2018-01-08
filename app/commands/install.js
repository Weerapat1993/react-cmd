const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env = 'material-ui', pwd) => {
  console.log('')
  console.log('Installing ... React Starter Kit [Theme]:', env)
  console.log('')
  const Theme = require(`../themes/${env}`)
  const file = new MakeFile(cmd, env, pwd)
  
  file
    .runCommand(
      `
        npm install -S redux react-redux redux-thunk redux-mock-store redux-form array-collection axios prop-types styled-components lodash
        npm install -S material-ui react-tap-event-plugin redux-form-material-ui
        npm install -S react-router-dom
        npm install -D nock redux-mock-store redux-logger
        npm install
      `
    )
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
