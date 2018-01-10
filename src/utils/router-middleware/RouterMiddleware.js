import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authActions } from '../../redux/auth'

class RouterMiddleware extends Component {
  constructor() {
    super()

    this.state = {
      jwt: false
    }
  }

  componentWillMount() {
    if(localStorage.jwtToken) {
      const token = localStorage.jwtToken
      this.setState({ jwt: true })
      // setAuthorizationToken(localStorage.jwtToken)
      this.props.authActions.getUserWithToken(token)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = this.props
    if(auth.isLoading !== nextProps.auth.isLoading && !nextProps.auth.isLoading) {
      if(auth.isAuth !== nextProps.auth.isAuth && nextProps.auth.isAuth) {
        this.setState({ jwt: false })
      } else {
        localStorage.removeItem('jwtToken')
        this.setState({ jwt: false })
      }
    }
  }

  render() {
    const { auth, Routes, Router } = this.props
    const { jwt } = this.state
    if(!jwt) {
      return (
        <Router>
          <Routes isAuth={auth.isAuth} authUser={auth.user} />
        </Router>
      )
    } else {
      return null
    }
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
  mapDispatchToProps
)(RouterMiddleware)