import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import I18n from '../../../lang'

const textCommon = I18n.t().common

class RegisterPage extends Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <h2>Register Page</h2> 
        <ul>
          <li><Link to="/">{textCommon.home}</Link></li>
          <li><Link to="/about">{textCommon.about}</Link></li>
          <li><Link to="/login">{textCommon.login}</Link></li>
          <li><Link to="/register">{textCommon.register}</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/not-found">Not Found</Link></li>
        </ul>
      </div>
    )
  }
}

export default RegisterPage
