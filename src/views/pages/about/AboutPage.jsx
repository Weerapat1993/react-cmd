import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Aunthentication } from '../../components'
import I18n from '../../../lang'

const textCommon = I18n.t().common

const AboutPage = ({ auth, authLogout }) => (
  <div>
    <h1>Hello React</h1>
    <h2>About Page</h2> 
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

AboutPage.propTypes = {
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

export default Aunthentication(AboutPage)
