import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authActions } from '../../../redux/auth'

const Authentication = (WrapperComponent) => {
  class Auth extends Component {
    static propTypes = {
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

    render () {
      return <WrapperComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    auth: state.auth
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    authLogout: () => dispatch(authActions.authLogout())
  })

  return connect(mapStateToProps, mapDispatchToProps)(Auth)
}

export default Authentication
