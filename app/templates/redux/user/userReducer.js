import { 
  FETCH_USER, 
  UPDATE_USER,
  USER_CLEAR_ERROR,
} from './userActionTypes'
import { User } from '../model'

export const initalState = {
  data: [],
  isFetching: false,
  error: false
}

/**
 * Auth Reducer
 * @param {*} state 
 * @param {{ type: string, data: [], error: string }} action 
 * @return {initalState}
 */
export const userReducer = (state = initalState, action) => {
  switch(action.type) {
    case FETCH_USER.REQUEST:
      return reducerFetchUserRequest(state, action)
    case FETCH_USER.SUCCESS:
      return reducerFetchUserSuccess(state, action)
    case FETCH_USER.FAILURE:
      return reducerFetchUserFailure(state, action)
    case UPDATE_USER.REQUEST:
      return reducerUpdateUserRequest(state, action)
    case UPDATE_USER.SUCCESS:
      return reducerUpdateUserSuccess(state, action)
    case UPDATE_USER.FAILURE:
      return reducerUpdateUserFailure(state, action)
    case USER_CLEAR_ERROR: 
      return reducerUserClearError(state, action)
    default:
      return state
  }
}

// AUTH -----------------------------------------------------------------
export const reducerFetchUserRequest = (state, action) => ({
  ...state,
  isFetching: true
})

export const reducerFetchUserSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  data: action.payload
})

export const reducerFetchUserFailure = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
})

export const reducerUpdateUserRequest = (state, action) => ({
  ...state,
  isFetching: true
})

export const reducerUpdateUserSuccess = (state, action) => {
  let oldData = state.data
  const newData = User(oldData).where('id', action.payload.id).update({
    ...action.payload
  })
  return {
    ...state,
    isFetching: false,
    data: newData
  }
}

export const reducerUpdateUserFailure = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
})

export const reducerUserClearError = (state, action) => ({
  ...state,
  error: false,
})