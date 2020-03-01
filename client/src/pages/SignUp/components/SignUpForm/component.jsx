import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { StyledForm, SubmitButton, Progress, ErrorMessage, InputField } from './styles'

const SignUpForm = ({ signUpRequest, error }) => {
  const handleFormSubmit = (values, formMethods) => {
    signUpRequest(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      },
      formMethods.setSubmitting
    )
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be 6 characters or more')
          .required('Password is required'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
        <StyledForm as={Form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="firstName"
                id="firstName"
                label="First Name"
                required
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={errors.firstName && touched.firstName}
                helperText={errors.firstName && touched.firstName && errors.firstName}
                InputProps={{ className: 'text-input' }}
                FormHelperTextProps={{ className: 'helper-text' }}
                InputLabelProps={{ className: 'input-label' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="lastName"
                id="lastName"
                label="Last Name"
                required
                fullWidth
                autoComplete="lname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName && touched.lastName}
                helperText={errors.lastName && touched.lastName && errors.lastName}
                InputProps={{ className: 'text-input' }}
                FormHelperTextProps={{ className: 'helper-text' }}
                InputLabelProps={{ className: 'input-label' }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="email"
                id="email"
                label="Email Address"
                required
                fullWidth
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
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="password"
                id="password"
                label="Password"
                required
                fullWidth
                type="password"
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
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="passwordConfirm"
                id="password-confirm"
                label="Confirm Password"
                required
                fullWidth
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                error={errors.passwordConfirm && touched.passwordConfirm}
                helperText={
                  errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm
                }
                InputProps={{ className: 'text-input' }}
                FormHelperTextProps={{ className: 'helper-text' }}
                InputLabelProps={{ className: 'input-label' }}
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Progress size={20} /> : 'Sign Up'}
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

SignUpForm.propTypes = {
  signUpRequest: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default SignUpForm
