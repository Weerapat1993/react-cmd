import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { authActions } from '../../../redux/auth'
import LoginForm from '../../forms/LoginForm'
import { AlertDialog } from '../../components'

class LoginPage extends React.Component {
  constructor() {
    super()

    this.handleClearError = this.handleClearError.bind(this)
  }

  handleClearError() {
    this.props.authActions.authClearError()
  }

  handleSubmit(values, dispatch, props) {
    if(props.isAuth) {
      alert('User has been Login')
    } else {
      dispatch(authActions.auth(values))
    } 
  }
  render () {
    const { auth } = this.props
    return (
      <div>
        { auth.error && <AlertDialog error={auth.error} onClearError={this.handleClearError} /> }
        {
          (auth.isAuth) ?
          <h1>Login Successful</h1>
          : <LoginForm onSubmit={this.handleSubmit} loading={auth.isLoading} isAuth={auth.isAuth} />
        }
      </div>
      
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
