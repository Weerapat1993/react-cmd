const Case = require('case')
const { MakeFile, Log } = require('../utils')
const { FILE_TYPE } = require('../config')

// Make Component Command
const makeComponent = (cmd, env, pwd) => {
  const file = new MakeFile(cmd, env, pwd)
  const log = new Log()
  const envPascalCase = Case.pascal(env)

  switch(env) {
    case 'Errors':
      log.error(`Error : cannot create component ${env}.`)
      break
    default:
    file
      .createDirectory('')
      .createDirectory('/views')
      .createDirectory('/views/components')
      .createDirectory(`/views/components/${envPascalCase}`)
      .createFile(`/views/components/${envPascalCase}/index.js`,
`import ${envPascalCase} from './${envPascalCase}'

export { ${envPascalCase} }
`
)
      .createFile(`/views/components/${envPascalCase}/${envPascalCase}.${FILE_TYPE}`,
`import React from 'react'
import PropTypes from 'prop-types'

const ${envPascalCase} = (props) => {
  return (
    <div>
      <p>${envPascalCase} Component</p> 
    </div>
  )
}

${envPascalCase}.propTypes = {
  data: PropTypes.object,
}

${envPascalCase}.defaultProps = {
  data: {},
}

export default ${envPascalCase}
`
)
    log.default('\nPlease add text info file ./src/views/components/index.js\n')
    log.success(`export { ${envPascalCase} } from './${envPascalCase}'\n`)
  }
}

module.exports = makeComponent
