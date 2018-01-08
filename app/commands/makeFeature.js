const Case = require('case')
const { MakeFile, Log } = require('../utils')
const { FILE_TYPE } = require('../config')

// Make Component Command
const makeFeature = (cmd, env, pwd) => {
  const file = new MakeFile(cmd, env, pwd)
  const log = new Log()
  const envCamelCase = Case.camel(env)
  const envPascalCase = Case.pascal(env)

  file
    .createDirectory(`/views/features/${envCamelCase}`)
    .createFile(`/views/features/${envCamelCase}/index.js`,
`import ${envPascalCase}Container from './${envPascalCase}Container'

export {
  ${envPascalCase}Container
}
`
)
    .createFile(`/views/features/${envCamelCase}/${envPascalCase}Container.${FILE_TYPE}`,
`
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userActions } from '../../../redux/user'
import { store } from '../../../utils'

export class ${envPascalCase}Container extends Component {
  static propTypes = {
    data: PropTypes.object,
    fetchUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
  }

  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <p>${envPascalCase}Container</p> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: store(state).user.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(userActions.fetchUser())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(${envPascalCase}Container)
`
)
  log.default('\nPlease add text info file ./src/views/features/index.js\n')
  log.success(`export { ${envPascalCase}Container } from './${envCamelCase}'\n`)
}

module.exports = makeFeature
