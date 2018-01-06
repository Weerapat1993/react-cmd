import { rootReducers } from '../../redux/rootReducers'

const action = { type: 'ETC' }
const { auth, user, role } = rootReducers

export const dataStore = {
  auth: auth(undefined, action),
  user: user(undefined, action),
  role: role(undefined, action),
}

/**
 * State in Store
 * @param {dataStore} state
 * @return {dataStore}
 */
export const store = (state) => state
