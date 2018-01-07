import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import globalStyles from './styles'

const PageBase = ({ title, navigation, children }) => (
  <div>
    <span style={globalStyles.navigation}>{navigation}</span>
    <Paper style={globalStyles.paper}>
      <h3 style={globalStyles.title}>{title}</h3>
      {children}
      <div style={globalStyles.clear}/>
    </Paper>
  </div>
)

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
}

export default PageBase
