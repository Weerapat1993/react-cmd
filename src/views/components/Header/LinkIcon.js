import React from 'react'
import { Link } from 'react-router-dom'
import { white } from 'material-ui/styles/colors'
import { IconButton } from 'material-ui'

const LinkIcon = ({ to, Icon }) => (
  <Link to={to}>
    <IconButton><Icon color={white} /></IconButton>
  </Link>
)

export default LinkIcon