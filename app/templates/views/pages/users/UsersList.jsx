import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { 
  Avatar, 
  List, 
  ListItem,
  Subheader,
  Divider,
  Paper,
  IconButton,
  FloatingActionButton,
} from 'material-ui'
import { 
  ContentCreate,
  NavigationMoreVert,
  DeviceWallpaper,
  ActionDelete,
} from 'material-ui/svg-icons'
import {grey400, grey200, cyan600, white, grey900} from 'material-ui/styles/colors'
import {typography} from 'material-ui/styles'

const UsersList = ({ title, data, fields, linkTo }) => {
  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white
    },
    editButton: {
      fill: grey900
    },
  }

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <NavigationMoreVert color={grey400} />
    </IconButton>
  )

  const rightIconMenu = (
    <div>
      <Link className="button" to="/users">
        <FloatingActionButton zDepth={0}
                              mini={true}
                              backgroundColor={grey200}
                              iconStyle={styles.editButton}>
          <ContentCreate />
        </FloatingActionButton>
      </Link> &nbsp;
      <Link className="button" to="/users">
        <FloatingActionButton zDepth={0}
                              mini={true}
                              backgroundColor={grey200}
                              iconStyle={styles.editButton}>
          <ActionDelete />
        </FloatingActionButton>
      </Link>
    </div>
  )

  return (
    <Paper>
      <List>
        <Subheader style={styles.subheader}>{title}</Subheader>
        {data.map(item =>
          <div key={item[fields.key]}>
            <ListItem
              containerElement={<Link to={`${linkTo}/${item[fields.key]}`} />}
              leftAvatar={<Avatar icon={<DeviceWallpaper />} />}
              primaryText={item[fields.title]}
              secondaryText={item[fields.subtitle]}
              rightIconButton={rightIconMenu}
            />
            <Divider inset={true} />
          </div>
        )}
      </List>
    </Paper>
  )
}

UsersList.propTypes = {
  data: PropTypes.array
}

export default UsersList
