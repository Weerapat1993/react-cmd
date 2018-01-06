import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Hello React - Dashboard</h1>
        <h2><Link to='/'>Back to Home</Link></h2>
      </div>
    )
  }
}

export default Dashboard
