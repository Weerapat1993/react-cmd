import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { CircularProgress, Paper, RaisedButton, Checkbox, TextField } from 'material-ui'
import { grey500, white, fullWhite } from 'material-ui/styles/colors'

import { registerValidation } from './validation'

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

const ButtonDiv = styled.div`
  text-align: center;
  padding: 10px;
`

const ButtonSpan = styled.span`
  margin-left: 5px;
`

const SocialButtonLink = styled(Link)`
  background: ${props => props.google ? '#e14441' : '#4f81e9'};
  color: ${white};
  padding: 7px;
  border-radius: 2px;
  margin: 2px;
  font-size: 13px;
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
      fullWidth={true}
      autoComplete="off"
      errorText={field.meta.touched && field.meta.error && field.meta.error }
    />
  </div>
)

class RegisterForm extends React.Component {
  render() {
    const { handleSubmit, loading } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <LoginContainer>
          <PaperStyle>
            <h2>Registeration</h2>
            <Field name='email' component={renderField} type='email' label='Email' placeholder='Email' />
            <Field name='password' component={renderField} type='password' label='Password' placeholder='Password' />
            <Field name='password_confirmation' component={renderField} type='password' label='Confirm Password' placeholder='Password' />
            <div>
              <Checkbox
                label="Remember me"
                style={styles.checkRemember.style}
                labelStyle={styles.checkRemember.labelStyle}
                iconStyle={styles.checkRemember.iconStyle}
              />

              <LoginButton 
                disabled={loading}
                labelPosition="before"
                icon={loading && <CircularProgress size={20} color={fullWhite} />}
                label={<b>Login</b>}
                primary={true}
                type="submit"
              />
            </div>
          </PaperStyle>

          <ButtonDiv>
            <SocialButtonLink to="/" facebook >
              <i className="fa fa-facebook fa-lg"/>
              <ButtonSpan>Log in with Facebook</ButtonSpan>
            </SocialButtonLink>
            <SocialButtonLink to="/" google >
              <i className="fa fa-google-plus fa-lg"/>
              <ButtonSpan>Log in with Google</ButtonSpan>
            </SocialButtonLink>
          </ButtonDiv>
        </LoginContainer>
      </form>
    );
  }
}

// Decorate the form component
RegisterForm = reduxForm({
  form: 'register', // a unique name for this form
  validate: registerValidation,
})(RegisterForm);

export default RegisterForm;
