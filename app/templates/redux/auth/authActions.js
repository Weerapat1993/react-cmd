import axios from 'axios'
import { AUTH, AUTH_LOGOUT, AUTH_CLEAR_ERROR } from './authActionTypes'
import { API_ENDPOINT_AUTH_LOGIN, API_ENDPOINT_GET_USER_WITH_TOKEN } from '../../config/endpoint'
// import { setAuthorizationToken } from '../../utils'

export const authRequest = () => ({
  type: AUTH.REQUEST
})

export const authSuccess = (payload) => ({
  type: AUTH.SUCCESS,
  payload
})

export const authFailure = (error) => ({
  type: AUTH.FAILURE,
  error: error.message
})


export const auth = (body) => (dispatch, getState) => {
  dispatch(authRequest())
  return axios.post(API_ENDPOINT_AUTH_LOGIN, body)
    .then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      // setAuthorizationToken(token)
      return dispatch(authSuccess(res.data))
    })
    .catch(error => dispatch(authFailure(error)))
}

export const getUserWithToken = (token) => (dispatch, getState) => {
  dispatch(authRequest())
  return axios.get(`${API_ENDPOINT_GET_USER_WITH_TOKEN}?token=${token}`)
    .then(res => {
      const data = {
        token,
        user: res.data.data
      }
      return dispatch(authSuccess(data))
    })
    .catch(error => dispatch(authFailure(error)))
} 

export const authLogout = () => {
  localStorage.removeItem('jwtToken')
  // setAuthorizationToken()
  return {
    type: AUTH_LOGOUT
  }
}

export const authClearError = () => ({
  type: AUTH_CLEAR_ERROR
})