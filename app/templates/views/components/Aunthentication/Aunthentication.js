import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authActions } from '../../../redux/auth'
import { AuthPropTypes } from './propTypes'

const Authentication = (WrapperComponent) => {
  const Auth = (props) => (
    <WrapperComponent {...props} />
  )

  Auth.propTypes = {
    auth: AuthPropTypes.auth.isRequired,
    authLogout: PropTypes.func.isRequired,
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
