import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { StyledForm, SubmitButton, Progress } from './styles'

const SignInForm = ({ signIn, error }) => {
  const handleFormSubmit = (values, formMethods) => {
    signIn(
      {
        email: values.email,
        password: values.password,
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
          <TextField
            autoFocus
            variant="outlined"
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
          />
          <TextField
            variant="outlined"
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
            <Typography color="error" variant="body1" align="center" gutterBottom>
              {error}
            </Typography>
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
  signIn: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
}

export default SignInForm
