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
`import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Aunthentication } from '../../components'
import I18n from '../../../lang'

const textCommon = I18n.t().common

const ${envPascalCase}Page = ({ auth, authLogout }) => (
  <div>
    <h1>Hello React</h1>
    <h2>${envPascalCase} Page</h2> 
    <ul>
      <li><Link to="/">{textCommon.home}</Link></li>
      <li><Link to="/about">{textCommon.about}</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/not-found">Not Found</Link></li>
    </ul>
    {
      !auth.isAuth ? (
        <ul>
          <li><Link to="/login">{textCommon.login}</Link></li>
          <li><Link to="/register">{textCommon.register}</Link></li>
        </ul>
      ) : (
        <ul>
          <li><a onClick={authLogout}>{textCommon.logout}</a></li>
        </ul>
      )
    }
  </div>
)

${envPascalCase}Page.propTypes = {
  auth: PropTypes.shape({
    isAuth: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object,
    ]),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ])
  }),
  authLogout: PropTypes.func.isRequired,
}

export default Aunthentication(${envPascalCase}Page)
`
  )
}

module.exports = makeRedux