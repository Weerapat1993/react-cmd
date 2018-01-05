import axios from 'axios'
import { FETCH_ROLE } from './roleActionTypes'
import { API_ENDPOINT_GET_ROLES } from '../../config/endpoint'

export const fetchRoleRequest = () => ({
  type: FETCH_ROLE.REQUEST
})

export const fetchRoleSuccess = (payload) => ({
  type: FETCH_ROLE.SUCCESS,
  payload
})

export const fetchRoleFailure = (error) => ({
  type: FETCH_ROLE.FAILURE,
  error: error.message,
})

export const fetchRole = () => (dispatch, getState) => {
  dispatch(fetchRoleRequest())
  return axios.get(API_ENDPOINT_GET_ROLES)
    .then(res => dispatch(fetchRoleSuccess(res.data.data)))
    .catch(error => dispatch(fetchRoleFailure(error.data)))
}