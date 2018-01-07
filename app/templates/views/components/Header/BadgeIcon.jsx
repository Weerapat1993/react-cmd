import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from 'material-ui'
import {white} from 'material-ui/styles/colors'


const BangeIcon = ({ to, badge, Icon }) => {
  return(
    <Link to={to}>
      <Badge
        badgeContent={badge}
        secondary={true}
        badgeStyle={{top: 12, right: 12}}
        style={{ marginTop: -10 }}
      >                     
        <Icon color={white}/>
      </Badge>
    </Link>
  )
}

export default BangeIcon