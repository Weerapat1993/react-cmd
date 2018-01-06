import React from 'react'
import PropTypes from 'prop-types'

const AlertDialog = (props) => {
  return (
    <div>
      <p>AlertDialog Component</p> 
    </div>
  )
}

AlertDialog.propTypes = {
  data: PropTypes.object,
}

AlertDialog.defaultProps = {
  data: {},
}

export default AlertDialog