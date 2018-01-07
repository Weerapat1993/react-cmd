import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../../../redux/auth'
import { store } from '../../../utils'
import I18n from '../../../lang'

const textCommon = I18n.t().common

class HomePage extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuth: PropTypes.bool,
      isLoading: PropTypes.bool,
      user: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
      ]),
      error: PropTypes.string,
    }),
    authActions: PropTypes.shape({
      authLogout: PropTypes.func.isRequired,
    })
  }

  constructor() {
    super()

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.authActions.authLogout()
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <h1>Hello React</h1>
        <h2>Home Page</h2> 
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
              <li><a onClick={this.handleLogout}>{textCommon.logout}</a></li>
            </ul>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: store(state).auth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  authActions: bindActionCreators(authActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)
