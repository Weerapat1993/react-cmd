import { createStore, applyMiddleware, compose } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { apiMiddleware } from 'redux-api-middleware'
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
