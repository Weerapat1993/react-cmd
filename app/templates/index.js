import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

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

const Render = () => (
  <Provider store={configureStore()}>
    <MuiThemeProvider muiTheme={themeDefault}>
      <Router>
        <RouterMiddleware Routes={Routes} />
      </Router>  
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<Render />, document.getElementById('root'))
registerServiceWorker()
