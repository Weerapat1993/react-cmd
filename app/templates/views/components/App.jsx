import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authActions } from '../../redux/auth'
import { Header } from './Header'
import { LeftDrawer } from './LeftDrawer'
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth'
import Data from '../assets/data/data'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navDrawerOpen: props.width === LARGE
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this)
  }

  handleLogout() {
    this.props.authActions.authLogout()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE})
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }

  render() {
    let { navDrawerOpen } = this.state
    const { auth, width } = this.props
    const isMobile = width <= 480
    const paddingLeftDrawerOpen = 236

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    }

    return (
      <div>
        <Header 
          styles={styles.header}
          navDrawerOpen={navDrawerOpen && !isMobile}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
          auth={auth}
          onLogout={this.handleLogout}
        />

        <LeftDrawer 
          navDrawerOpen={navDrawerOpen}
          menus={auth.isAuth ? Data.menusAdmin : Data.menus}
          auth={auth}
        />
        <div style={styles.container} >
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  authActions: bindActionCreators(authActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withWidth()(App)) 
