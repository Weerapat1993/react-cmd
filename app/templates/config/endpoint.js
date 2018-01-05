export const API_ENDPOINT = (path) => `http://localhost:8000/api${path}`

// Authentiaction
export const API_ENDPOINT_AUTH_LOGIN = API_ENDPOINT('/auth/login')
export const API_ENDPOINT_GET_USER_WITH_TOKEN = API_ENDPOINT('/user')

// Users
export const API_ENDPOINT_GET_USERS = API_ENDPOINT('/users')
export const API_ENDPOINT_UPDATE_USERS = API_ENDPOINT('/users/update')

// Role
export const API_ENDPOINT_GET_ROLES = API_ENDPOINT('/roles')

