
import { 
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from './userActionTypes'

const initialState = {
  isFetching: false,
  data: [],
  error: null
}

export const userReducer = (state, action) => {
  switch(action.type) {
    case FETCH_USER.REQUEST:
      return state
    case FETCH_USER.SUCCESS:
      return state
    case FETCH_USER.FAILURE:
      return state
    case CREATE_USER.REQUEST:
      return state
    case CREATE_USER.SUCCESS:
      return state
    case CREATE_USER.FAILURE:
      return state
    case UPDATE_USER.REQUEST:
      return state
    case UPDATE_USER.SUCCESS:
      return state
    case UPDATE_USER.FAILURE:
      return state
    case DELETE_USER.REQUEST:
      return state
    case DELETE_USER.SUCCESS:
      return state
    case DELETE_USER.FAILURE:
      return state
    default:
      return state
  }
}
