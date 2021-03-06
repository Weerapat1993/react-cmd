import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FloatingActionButton } from 'material-ui'
import { ContentAdd } from 'material-ui/svg-icons'
import { Aunthentication, AuthPropTypes, PageBase } from '../../components'
import I18n from '../../../lang'

const textCommon = I18n.t().common
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

const AboutPage = ({ auth, authLogout }) => (
  <PageBase title="About Page" navigation="Application / About Page">
    <ul>
      <li><Link to="/">{textCommon.home}</Link></li>
      <li><Link to="/about">{textCommon.about}</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/not-found">Not Found</Link></li>
    </ul>
    {
      !auth.isAuth ? (
        <ul>
          <li><Link to="/login">{textCommon.login}</Link></li>
          <li><Link to="/register">{textCommon.register}</Link></li>
        </ul>
      ) : (
        <ul>
          <li><a onClick={authLogout}>{textCommon.logout}</a></li>
        </ul>
      )
    }
    <Link to="/about/create" >
      <FloatingActionButton style={styles.floatingActionButton} secondary >
        <ContentAdd />
      </FloatingActionButton>
    </Link>
  </PageBase>
)

AboutPage.propTypes = {
  auth: AuthPropTypes.auth,
  authLogout: PropTypes.func.isRequired,
}

export default Aunthentication(AboutPage)