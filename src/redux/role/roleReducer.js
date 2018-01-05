import { FETCH_ROLE } from './roleActionTypes'

export const initalState = {
  data: [],
  isFetching: false,
  error: false
}

export const roleReducer = (state = initalState, action) => {
  switch(action.type) {
    case FETCH_ROLE.REQUEST:
      return reducerFetchRoleRequest(state, action)
    case FETCH_ROLE.SUCCESS:
      return reducerFetchRoleSuccess(state, action)
    case FETCH_ROLE.FAILURE:
      return reducerFetchRoleFailure(state, action)
    default:
      return state
  }
}

// AUTH -----------------------------------------------------------------
export const reducerFetchRoleRequest = (state, action) => ({
  ...state,
  isFetching: true
})

export const reducerFetchRoleSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  data: action.payload
})

export const reducerFetchRoleFailure = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
})