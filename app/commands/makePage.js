const Case = require('case')
const { MakeFile } = require('../utils')
const { FILE_TYPE } = require('../config')

// Make Redux Command
const makeRedux = (cmd, env) => {
  const file = new MakeFile(cmd, env)
  const envPascalCase = Case.pascal(env)
  const envKebab = Case.kebab(env)
  file
    .createDirectory(`/views/pages/${envKebab}`)
    .createFile(`/views/pages/${envKebab}/index.js`,
`import ${envPascalCase}Page from './${envPascalCase}Page'

export default ${envPascalCase}Page
`
  )
    .createFile(`/views/pages/${envKebab}/${envPascalCase}Page.${FILE_TYPE}`,
`import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import I18n from '../../../lang'

const textCommon = I18n.t().common

class ${envPascalCase}Page extends Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <h2>${envPascalCase} Page</h2> 
        <ul>
          <li><Link to="/">{textCommon.home}</Link></li>
          <li><Link to="/about">{textCommon.about}</Link></li>
          <li><Link to="/login">{textCommon.login}</Link></li>
          <li><Link to="/register">{textCommon.register}</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/not-found">Not Found</Link></li>
        </ul>
      </div>
    )
  }
}

export default ${envPascalCase}Page
`
  )
}

module.exports = makeRedux