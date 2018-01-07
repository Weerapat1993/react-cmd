import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Menu from 'material-ui/svg-icons/navigation/menu'
import { white } from 'material-ui/styles/colors'
import BadgeIcon from './BadgeIcon'
import LinkIcon from './LinkIcon'

import { 
  AppBar, 
  IconButton, 
  IconMenu, 
  MenuItem,
  Divider,
} from 'material-ui'

import { 
  ActionLock, 
  SocialNotifications, 
  ActionShoppingCart,
  SocialPerson,
  HardwareKeyboardReturn,
  CommunicationVpnKey,
} from 'material-ui/svg-icons'

class Header extends Component {
  render() {
    const {styles, handleChangeRequestNavDrawer, auth, onLogout, navDrawerOpen } = this.props

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 15
      },
      iconsRightContainer: {
        marginLeft: 5
      }
    }

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={'Title'}
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  {
                    auth.isAuth ? 
                      <span>
                        {
                          !navDrawerOpen &&
                          <span>
                            <BadgeIcon to='/cart' badge={4} Icon={ActionShoppingCart} />
                            <BadgeIcon to='/notifications' badge={10} Icon={SocialNotifications} />
                          </span>
                        }
                        <IconMenu color={white}
                                  iconButtonElement={
                                    <IconButton><MoreVertIcon color={white}/></IconButton>
                                  }
                                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                          <MenuItem primaryText="Profile" leftIcon={<SocialPerson />} containerElement={<Link to='/profile' />} />
                          <Divider /> 
                          <MenuItem onClick={() => onLogout()} primaryText="Sign out" leftIcon={<HardwareKeyboardReturn />} containerElement={<Link to='/login' />} />
                        </IconMenu>
                      </span>
                    :
                    <span>
                      <LinkIcon to='/login' Icon={ActionLock} />  
                      <LinkIcon to='/register' Icon={CommunicationVpnKey} />  
                    </span>
                   
                  }
                </div>
              }
            />
          </div>
      )
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
}

export default Header
