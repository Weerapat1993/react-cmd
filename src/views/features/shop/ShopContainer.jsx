
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userActions } from '../../../redux/user'
import { store } from '../../../utils'

export class ShopContainer extends Component {
  static propTypes = {
    data: PropTypes.object,
    fetchUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
  }

  constructor() {
    super()

    this.state = {

    }
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const { data } = this.props
    return (
      <div>
        <p>ShopContainer</p> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: store(state).user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(userActions.fetchUser())
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ShopContainer)