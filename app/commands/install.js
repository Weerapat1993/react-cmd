const Case = require('case')
const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  
  file
    .copyFolderTemplate('/config', '/config')
    .copyFolderTemplate('/redux', '/redux')
    .createDirectory('/routes')
    .createDirectory('/styles')
    .createDirectory('/views')
    .copyFolderTemplate('/utils', '/utils')
    .copyFolderTemplate('/views', '/views')
    .createFile('/index.js',
`import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Routes } from './views/routes'
import { RouterMiddleware } from './utils'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={configureStore()}>
    <RouterMiddleware Routes={Routes} />
  </Provider>
,document.getElementById('root'))

registerServiceWorker()

`
)
}

module.exports = Install
