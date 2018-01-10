import React from 'react'
import { Link } from 'react-router-dom'
import { FloatingActionButton } from 'material-ui'
import { ActionHome } from 'material-ui/svg-icons'

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}

const Error404 = ({ location }) => (
  <div>
    <center>
      <h1>Sorry, Page not found.</h1>
      <p>No match for <code>{location.pathname}</code></p>
    </center>
    <Link to='/'>
      <FloatingActionButton secondary style={styles.floatingActionButton}>
        <ActionHome />
      </FloatingActionButton>
    </Link>
  </div> 
)

export default Error404
