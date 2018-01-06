import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Hello React - Login</h1>
        <h2><Link to='/'>Back to Home</Link></h2>
      </div>
    )
  }
}

export default Login
