import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = ({ location }) => (
  <center>
    <h1>404 <small>Sorry, page not found</small></h1>
    <p>
      No match for <code>{location.pathname}</code>
    </p>
    <Link to='/'>Back to Home</Link>  
  </center>
)

export default NotFound