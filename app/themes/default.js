module.exports = 
`import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Routes } from './views/routes'
import { RouterMiddleware } from './utils'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

// StyleSheet
import './views/styles/styles.css'
import './views/styles/flex.css'

const Render = () => (
  Provider store={configureStore()}>
    <RouterMiddleware Routes={Routes} />
  </Provider>
)

ReactDOM.render(<Render />, document.getElementById('root'))
registerServiceWorker()
`