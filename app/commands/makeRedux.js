const Case = require('case')
const { MakeFile } = require('../utils')

// Make Redux Command
const makeRedux = (cmd, env, pwd) => {
  const file = new MakeFile(cmd, env, pwd)
  const envCamelCase = Case.camel(env)
  const envUpperCase = Case.upper(env)
  const envPascalCase = Case.pascal(env)
  file
    .createDirectory(`/redux/`)
    .createDirectory(`/redux/${envCamelCase}/`)
    // Actions
    .createFile(`/redux/${envCamelCase}/${envCamelCase}Actions.js`,
`
import axios from 'axios'
import { 
  FETCH_${envUpperCase},
  CREATE_${envUpperCase},
  UPDATE_${envUpperCase},
  DELETE_${envUpperCase},
} from './${envCamelCase}ActionTypes'

export const fetch${envPascalCase}Request = () => ({ type: FETCH_${envUpperCase}.REQUEST }) 
export const fetch${envPascalCase}Success = (data) => ({ type: FETCH_${envUpperCase}.SUCCESS, data }) 
export const fetch${envPascalCase}Failure = (error) => ({ type: FETCH_${envUpperCase}.FAILURE, error }) 
export const fetch${envPascalCase} = () => (dispatch, getState) => {
  dispatch(fetch${envPascalCase}Request())
  return axios({
    method: 'GET',
    responseType: 'json',
    url: API_ENDPOINT_FETCH_${envUpperCase}(),
    headers: {
      'X-Activity': 'Get ${envPascalCase} Data',
      // Authorization: configToken.getToken(getState())
    },
  })
    .then(res => dispatch(fetch${envPascalCase}Success(res.data.data)))
    .catch(error => dispatch(fetch${envPascalCase}Failure(error)))
}
`
    )
    // Reducer
    .createFile(`/redux/${envCamelCase}/${envCamelCase}Reducer.js`,
`
import { 
  FETCH_${envUpperCase},
  CREATE_${envUpperCase},
  UPDATE_${envUpperCase},
  DELETE_${envUpperCase},
} from './${envCamelCase}ActionTypes'

const initialState = {
  isFetching: false,
  data: [],
  error: null
}

/**
 * ${envPascalCase} Reducer
 * @param {*} state 
 * @param {{ type: string, data: [], error: string }} action 
 * @return {initalState}
 */
export const ${envCamelCase}Reducer = (state, action) => {
  switch(action.type) {
    case FETCH_${envUpperCase}.REQUEST:
      return state
    case FETCH_${envUpperCase}.SUCCESS:
      return state
    case FETCH_${envUpperCase}.FAILURE:
      return state
    case CREATE_${envUpperCase}.REQUEST:
      return state
    case CREATE_${envUpperCase}.SUCCESS:
      return state
    case CREATE_${envUpperCase}.FAILURE:
      return state
    case UPDATE_${envUpperCase}.REQUEST:
      return state
    case UPDATE_${envUpperCase}.SUCCESS:
      return state
    case UPDATE_${envUpperCase}.FAILURE:
      return state
    case DELETE_${envUpperCase}.REQUEST:
      return state
    case DELETE_${envUpperCase}.SUCCESS:
      return state
    case DELETE_${envUpperCase}.FAILURE:
      return state
    default:
      return state
  }
}
`
    )
    // ActionTypes
    .createFile(`/redux/${envCamelCase}/${envCamelCase}ActionTypes.js`,
`import { asyncActionType } from '../../utils'

export const FETCH_${envUpperCase} = asyncActionType('FETCH_${envUpperCase}')
export const CREATE_${envUpperCase} = asyncActionType('CREATE_${envUpperCase}')
export const UPDATE_${envUpperCase} = asyncActionType('UPDATE_${envUpperCase}')
export const DELETE_${envUpperCase} = asyncActionType('DELETE_${envUpperCase}')
`
    )

    // index.js
    .createFile(`/redux/${envCamelCase}/index.js`,
`
import * as ${envCamelCase}Actions from './${envCamelCase}Actions'

export { ${envCamelCase}Reducer } from './${envCamelCase}Reducer'
export { ${envCamelCase}Actions }
`
    )
}

module.exports = makeRedux