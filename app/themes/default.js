module.exports = 
`import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './views/routes'
import { RouterMiddleware } from './utils'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

// StyleSheet
import './views/styles/styles.css'
import './views/styles/flex.css'

const Render = () => (
  <Provider store={configureStore()}>
    <Router>
      <RouterMiddleware Routes={Routes} />
    </Router>
  </Provider>
)

ReactDOM.render(<Render />, document.getElementById('root'))
registerServiceWorker()
`