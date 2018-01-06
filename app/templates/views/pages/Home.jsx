import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello React - Home</h1>
        <h2><Link to='/about'>About</Link></h2>
        <h2><Link to='/login'>Login</Link></h2>
        <h2><Link to='/dashboard'>Dashboard</Link></h2>
      </div>
    )
  }
}

export default Home
