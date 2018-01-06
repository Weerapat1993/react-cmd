const fs = require('fs')
const path = require('path')
const { Log } = require('../utils')
const log = new Log()
const srcPath = (pathName) => path.join(__dirname, `../../src${pathName}`)

const reducers = ['auth', 'user', 'role']

// Make Command
const Store = (cmd, env) => {
  log.success('Create Store Document')
  let properties = ''
  reducers.forEach(item => {
    properties += `* @property {{ isFetching: boolean, data: [], error: string }} ${item}\n `
  })
  const dir = srcPath('/utils/store/index.js')
  const text = 
`/**
 * Store Reducer -
 * @typedef {Object} Store
 ${properties}
 */

/**
 * State in Store
 * @param {Store} state
 * @return {Store}
 */
export const store = (state) => state
`
  fs.writeFileSync(dir, text)
  log.success('create store document success.')
}

module.exports = Store

