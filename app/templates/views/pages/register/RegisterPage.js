import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AuthPropTypes } from '../../components'
import { authActions } from '../../../redux/auth'
import RegisterForm from '../../forms/RegisterForm'

class RegisterPage extends React.Component {
  static propTypes = {
    auth: AuthPropTypes.auth.isRequired,
  }

  handleSubmit(values, dispatch, props) {
    console.log(values)
    alert(`
Name: ${values.name}
Email: ${values.email}
Password: ${values.password}
`)
  }

  render () {
    const { auth } = this.props
    return (
      <div>
        {
          (auth.isAuth) ?
            <h1>Register Successful</h1>
          : 
            <RegisterForm onSubmit={this.handleSubmit} loading={auth.isLoading} isAuth={auth.isAuth} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage)

