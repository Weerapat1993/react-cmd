import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { 
  CircularProgress, 
  TextField, 
  FlatButton, 
  Dialog,
  MenuItem,
} from 'material-ui'
import { fullWhite } from 'material-ui/styles/colors'
import { userValidation } from './validation'

import { SelectField, Checkbox } from 'redux-form-material-ui'

// outside your render() method
const renderField = (field) => (
  <TextField
    {...field.input}
    type={field.type}
    hintText={field.label}
    floatingLabelText={field.label}
    fullWidth={true}
    autoComplete="off"
    errorText={field.meta.touched && field.meta.error && field.meta.error }
    defaultValue={field.defaultValue}
  />
)

const hiddenField = (field) => (
  <input 
    {...field.input}
    type="hidden" 
    defaultValue={field.defaultValue}
  />
)


class UsersForm extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      changePassword: false,
    }

    const { id, name, email, role_id } = props.forms

    props.change('id', id)
    props.change('name', name)
    props.change('email', email)
    props.change('role_id', role_id)

    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleChangePassword(e) {
    this.setState({ changePassword: e.target.checked })
  }

  render() {
    const { handleSubmit, loading, open, handleClick, roles } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => handleClick(false)}
      />,
      <FlatButton
        disabled={loading}
        label="Submit"
        primary={true}
        icon={loading && <CircularProgress size={20} color={fullWhite} />}
        keyboardFocused={true}
        onClick={handleSubmit}
      />,
    ];
    return (
      <Dialog
          title="Edit Users"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={() => handleClick(false)}
          autoScrollBodyContent={true}
        >
        <form onSubmit={handleSubmit}>
          <Field name='id' component={hiddenField} />
          <Field name='name' component={renderField} type='text' label='Name' placeholder='Name' />
          <Field name='email' component={renderField} type='email' label='Email' placeholder='Email' />
          <Field name='role_id' component={SelectField} floatingLabelText='Role' fullWidth >
          {
            roles.map((item => (
              <MenuItem key={item.role_id} value={item.role_id} primaryText={item.role_name} />
            )))
          }
          </Field>
          {/* Change Password */}
          <Field name='change_password' component={Checkbox} label="เปลี่ยนรหัสผ่าน" onClick={this.handleChangePassword} />
          {
            this.state.changePassword &&
            <div>
              <Field name='password' component={renderField} type='password' label='New Password' placeholder='New Password' />
              <Field name='password_confirmation' component={renderField} type='password' label='Confirm Password' placeholder='Confirm Password' />
            </div>
          }
        </form>
      </Dialog>
    )
  }
}

// Decorate the form component
UsersForm = reduxForm({
  form: 'user', // a unique name for this form
  validate: userValidation,
})(UsersForm);

export default UsersForm;
