const Case = require('case')
const { MakeFile } = require('../utils')

// Make Command
const Install = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  
  file
    .createDirectory('/redux')
    .createDirectory('/assets')
    .createDirectory('/assets/images')
    .createDirectory('/components')
    .createFile('/components/index.js', '// ./src/components/index.js')
    .createDirectory('/config')
    .createFile('/config/endpoint.js', '// ./src/config/endpoint.js')
    .createDirectory('/redux')
    .createDirectory('/routes')
    .createDirectory('/styles')
    .createDirectory('/utils')
    .createDirectory('/views')
    .createFile('/utils/index.js',
`export * from './async-action-type'
export * from './form-validation'
export * from './router-middleware'
`
)
    .createDirectory('/utils/async-action-type')
    .createDirectory('/utils/form-validation')
    .createDirectory('/utils/router-middleware')
    .createDirectory('/utils/router-middleware/config')
    .createFile('/utils/async-action-type/asyncActionType.js', 
`export const asyncActionType = (type) => ({
  REQUEST: type+'_REQUEST',
  SUCCESS: type+'_SUCCESS',
  FAILURE: type+'_FAILURE',
})
`
)
    .createFile('/utils/async-action-type/index.js', `export * from './asyncActionType.js'`)
    .createFile('/redux/rootReducers.js',
`import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
})
`
)
    .createFile('/redux/store.js',
`import { createStore, applyMiddleware, compose } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import rootReducers from './rootReducers'

const middlewares = [thunk]
if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV === 'development') middlewares.push(createLogger)

const storeEnhancer = [
	applyMiddleware(...middlewares)
]

const finalCreateStore = compose(...storeEnhancer)(createStore)

// configureMockStore with unit test
export const mockStore = configureMockStore(middlewares)

// configureStore
export default function configureStore(initialState) {
  return finalCreateStore(rootReducers, initialState)
}
`
)

}

module.exports = Install
