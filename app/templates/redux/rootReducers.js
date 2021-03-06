import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { authReducer } from './auth'
import { userReducer } from './user'
import { roleReducer } from './role'

export const rootReducers = {
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
}

export default combineReducers(rootReducers)
