import { createValidator, required, email, minLength, maxLength, match } from '../../utils';

// Login Form Validation
export const loginValidation = createValidator({
  email: [required, email, minLength(6), maxLength(255)],
  password: [required, minLength(6), maxLength(24)],
})

// Register Form Validation
export const registerValidation = createValidator({
  name: [required, minLength(3), maxLength(255)],
  email: [required, email, minLength(6), maxLength(255)],
  password: [required, minLength(6), maxLength(24)],
  password_confirmation: [required, minLength(6), maxLength(24), match('password')],
})

// User Form Validation
export const userValidation = createValidator({
  name: [required, minLength(3), maxLength(255)],
  email: [required, email, minLength(6), maxLength(255)],
  role_id: [required],
  password: [required, minLength(6), maxLength(24)],
  password_confirmation: [required, minLength(6), maxLength(24), match('password')],
})