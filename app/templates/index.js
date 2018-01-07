import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import themeDefault from './config/theme-default' 

import { Routes } from './views/routes'
import { RouterMiddleware } from './utils'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

import './views/styles/styles.css'
import './views/styles/flex.css'

injectTapEventPlugin()

ReactDOM.render(
  <Provider store={configureStore()}>
    <MuiThemeProvider muiTheme={themeDefault}>
      <RouterMiddleware Routes={Routes} />
    </MuiThemeProvider>
  </Provider>
,document.getElementById('root'))

registerServiceWorker()
