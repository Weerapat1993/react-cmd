import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CircularProgress } from 'material-ui'
import { userActions } from '../../../redux/user'
import { roleActions } from '../../../redux/role'
import { AlertDialog, TextCenter } from '../../components'
import UsersTable from './UsersTable'
import UsersForm from '../../forms/UsersForm'
import { store } from '../../../utils'

class Users extends Component {
  constructor() {
    super()

    this.state = {
      userForm: {
        name: null,
        email: null,
      },
      open: false
    }
    
    this.handleForm = this.handleForm.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleClearError = this.handleClearError.bind(this)
  }

  componentDidMount() {
    const { users } = this.props
    if(!users.data.length) {
      this.props.userActions.fetchUser()
      this.props.roleActions.fetchRole()
    }
  }

  handleForm(item) {
    const { id, name, email, role_id } = item
    this.setState({ 
      userForm: {
        id,
        name,
        email,
        role_id,
      }
    })
    this.handleOpen(true)
  }

  handleOpen(open) {
    this.setState({ open })
  }

  handleEdit(value) {
    this.props.userActions.updateUser(value)
    this.handleOpen(false)
  }

  handleClearError() {
    this.props.userActions.userClearError()
  }

  render() {
    const { users, roles } = this.props
    const { userForm, open } = this.state
    return (
      <div>
        <div className="content">
          { users.error && <AlertDialog error={users.error} onClearError={this.handleClearError} /> }
          {
            users.isFetching ? 
              <TextCenter>
                <br />
                <CircularProgress size={120} />
              </TextCenter>  
            : <UsersTable 
                data={users.data} 
                onEdit={this.handleForm}
                onTouchTap={() => this.handleOpen(true)}
              />
          }
          {
            open &&
            <UsersForm 
              roles={roles.data}
              forms={userForm}
              onSubmit={this.handleEdit}
              open={this.state.open}
              handleClick={this.handleOpen}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: store(state).user,
  roles: store(state).role,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  userActions: bindActionCreators(userActions, dispatch),
  roleActions: bindActionCreators(roleActions, dispatch),
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Users)