import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import { Routes } from './views/routes'
// import { RouterMiddleware } from './utils'
import configureStore from './redux/store'
import registerServiceWorker from './registerServiceWorker'

import './index.css';
import App from './App';

// injectTapEventPlugin()

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
,document.getElementById('root'))

registerServiceWorker()
