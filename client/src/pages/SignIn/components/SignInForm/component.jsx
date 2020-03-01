import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
  StyledForm,
  SubmitButton,
  Progress,
  InputField,
  CheckboxLabel,
  ErrorMessage,
} from './styles'

const SignInForm = ({ signInRequest, error }) => {
  const [rememberMe, setRememberMe] = useState(false)

  const hangleRememberMeChange = () => {
    setRememberMe(!rememberMe)
  }

  const handleFormSubmit = (values, formMethods) => {
    signInRequest(
      {
        email: values.email,
        password: values.password,
        rememberMe,
      },
      formMethods.setSubmitting
    )
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
        <StyledForm as={Form} noValidate>
          <InputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            InputProps={{ className: 'text-input' }}
            FormHelperTextProps={{ className: 'helper-text' }}
            InputLabelProps={{ className: 'input-label' }}
          />
          <InputField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password}
            helperText={errors.password && touched.password && errors.password}
            InputProps={{ className: 'text-input' }}
            FormHelperTextProps={{ className: 'helper-text' }}
            InputLabelProps={{ className: 'input-label' }}
          />
          <CheckboxLabel
            control={
              <Checkbox value="remember" color="primary" onChange={hangleRememberMeChange} />
            }
            label="Remember me"
            checked={rememberMe}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Progress size={20} /> : 'Sign In'}
          </SubmitButton>
          {error && (
            <ErrorMessage color="error" variant="body1" align="center" gutterBottom>
              {error}
            </ErrorMessage>
          )}
        </StyledForm>
      )}
    </Formik>
  )
}

SignInForm.defaultProps = {
  error: null,
}

SignInForm.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
}

export default SignInForm
