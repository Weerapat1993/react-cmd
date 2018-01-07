import React from 'react'
import { Link } from 'react-router-dom'
import { FloatingActionButton } from 'material-ui'
import { HardwareKeyboardBackspace } from 'material-ui/svg-icons'
import { grey900 } from 'material-ui/styles/colors'
import { PageBase } from '../../components'

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

const UsersCreate = () => (
  <PageBase title="Form Page"
            navigation="Application / Form Page">
    <Link to="/users" >
      <FloatingActionButton style={styles.floatingActionButton} backgroundColor={grey900}>
        <HardwareKeyboardBackspace />
      </FloatingActionButton>
    </Link>
  </PageBase>
)

export default UsersCreate
