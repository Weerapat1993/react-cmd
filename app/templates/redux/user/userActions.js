import axios from 'axios'
import { 
  FETCH_USER, 
  UPDATE_USER,
  USER_CLEAR_ERROR,
} from './userActionTypes'
import { 
  API_ENDPOINT_GET_USERS,
  API_ENDPOINT_UPDATE_USERS
} from '../../config/endpoint'

export const fetchUserRequest = () => ({
  type: FETCH_USER.REQUEST
})

export const fetchUserSuccess = (payload) => ({
  type: FETCH_USER.SUCCESS,
  payload
})

export const fetchUserFailure = (error) => ({
  type: FETCH_USER.FAILURE,
  error: error.message
})

export const fetchUser = () => (dispatch, getState) => {
  let token = localStorage.jwtToken 
  dispatch(fetchUserRequest())
  return axios.get(`${API_ENDPOINT_GET_USERS}?token=${token}`)
    .then(res => dispatch(fetchUserSuccess(res.data.data)))
    .catch(error => dispatch(fetchUserFailure(error.data)))
}


export const updateUserRequest = () => ({
  type: UPDATE_USER.REQUEST
})

export const updateUserSuccess = (payload) => ({
  type: UPDATE_USER.SUCCESS,
  payload
})

export const updateUserFailure = (error) => ({
  type: UPDATE_USER.FAILURE,
  error: error.message
})

export const updateUser = (body) => (dispatch, getState) => {
  dispatch(updateUserRequest())
  return axios.put(`${API_ENDPOINT_UPDATE_USERS}`, body)
    .then(res => dispatch(updateUserSuccess(res.data.data)))
    .catch(error => dispatch(updateUserFailure(error)))
}


export const userClearError = () => ({
  type: USER_CLEAR_ERROR
})