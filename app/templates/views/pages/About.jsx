import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
  render() {
    return (
      <div>
        <h1>Hello React - About</h1>
        <h2><Link to='/'>Home</Link></h2>
      </div>
    )
  }
}

export default About
