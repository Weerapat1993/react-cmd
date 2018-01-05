import { AUTH, AUTH_LOGOUT, AUTH_CLEAR_ERROR } from './authActionTypes'

export const initalState = {
  isAuth: false,
  isLoading: false,
  user: false,
  error: false,
}

export const authReducer = (state = initalState, action) => {
  switch(action.type) {
    case AUTH.REQUEST:
      return reducerAuthRequest(state, action)
    case AUTH.SUCCESS:
      return reducerAuthSuccess(state, action)
    case AUTH.FAILURE:
      return reducerAuthFailure(state, action)
    case AUTH_CLEAR_ERROR:
      return reducerAuthClearError(state, action)
    case AUTH_LOGOUT:
      return initalState
    default:
      return state
  }
}

// AUTH -----------------------------------------------------------------
export const reducerAuthRequest = (state, action) => ({
  ...state,
  isLoading: true,
  error: false,
})

export const reducerAuthSuccess = (state, action) => ({
  ...state,
  isAuth: true,
  isLoading: false,
  user: action.payload.user,
  error: false,
})

export const reducerAuthFailure = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error
})

export const reducerAuthClearError = (state, action) => ({
  ...state,
  error: false,
})