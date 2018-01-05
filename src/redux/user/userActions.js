
import axios from 'axios'
import { 
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from './userActionTypes'

export const fetchUserRequest = () => ({ type: FETCH_USER.REQUEST }) 
export const fetchUserSuccess = (data) => ({ type: FETCH_USER.SUCCESS, data }) 
export const fetchUserFailure = (error) => ({ type: FETCH_USER.FAILURE, error }) 
export const fetchUser = () => (dispatch, getState) => {
  dispatch(fetchUserRequest())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_FETCH_USER(),
    headers: {
      'X-Activity': 'Get User Data',
      // Authorization: configToken.getToken(getState())
    },
  })
    .then(res => dispatch(fetchUserSuccess(res.data.data)))
    .catch(error => dispatch(fetchUserFailure(error)))
}
