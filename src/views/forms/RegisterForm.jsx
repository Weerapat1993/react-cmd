import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'
import { CircularProgress, Paper, RaisedButton, Checkbox, TextField } from 'material-ui'
import { grey500, fullWhite } from 'material-ui/styles/colors'
import { registerValidation } from './validation'
import I18n from '../../lang'

const textCommon = I18n.t().common

const LoginContainer = styled.div`
  min-width: 320px;
  max-width: 400px;
  height: auto;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto
`

const PaperStyle = styled(Paper)`
  padding: 20px;
  overflow: auto;
`

const LoginButton = styled(RaisedButton)`
  float: right;
`

const styles = {
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
}    

// outside your render() method
const renderField = (field) => (
  <div> 
    <TextField
      {...field.input}
      type={field.type}
      hintText={field.label}
      floatingLabelText={field.label}
      fullWidth
      autoComplete="off"
      errorText={field.meta.touched && field.meta.error && field.meta.error }
    />
  </div>
)

let RegisterForm = ({ handleSubmit, loading }) => (
  <form onSubmit={handleSubmit}>
    <LoginContainer>
      <PaperStyle>
        <h2>Registeration</h2>
        <Field name='name' component={renderField} type='name' label={textCommon.name} placeholder={textCommon.email} />
        <Field name='email' component={renderField} type='email' label={textCommon.email} placeholder={textCommon.email} />
        <Field name='password' component={renderField} type='password' label={textCommon.password} placeholder={textCommon.password} />
        <Field name='password_confirmation' component={renderField} type='password' label={textCommon.confirmPassword} placeholder={textCommon.confirmPassword} />
        <div>
          <Checkbox
            label={textCommon.rememberMe}
            style={styles.checkRemember.style}
            labelStyle={styles.checkRemember.labelStyle}
            iconStyle={styles.checkRemember.iconStyle}
          />

          <LoginButton 
            disabled={loading}
            labelPosition="before"
            icon={loading && <CircularProgress size={20} color={fullWhite} />}
            label={<b>{textCommon.register}</b>}
            primary
            type="submit"
          />
        </div>
      </PaperStyle>
    </LoginContainer>
  </form>
)

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

// Decorate the form component
RegisterForm = reduxForm({
  form: 'register', // a unique name for this form
  validate: registerValidation,
})(RegisterForm);

export default RegisterForm;
