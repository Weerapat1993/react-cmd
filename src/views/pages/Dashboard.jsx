import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <h2>Dashboard</h2> 
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/not-found">Not Found</Link></li>
        </ul>
      </div>
    )
  }
}

export default Dashboard
