import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { TextField, Grid, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { MAIN_PAGE_PATH } from '../../../constants'
import { StyledForm, SubmitButton, Progress } from './styles'

const SignUpForm = ({ addUser, isUserAdded, error }) => {
  const handleFormSubmit = values => {
    addUser({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    })
  }

  if (isUserAdded) {
    return <Redirect to={MAIN_PAGE_PATH} />
  }

  return (
    <>
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
                <TextField
                  autoFocus
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="fname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName && touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="lname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName && touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="passwordConfirm"
                  id="password-confirm"
                  label="Confirm Password"
                  variant="outlined"
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
                />
              </Grid>
            </Grid>
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting && error === null}
            >
              {isSubmitting && error === null ? <Progress size={20} /> : 'Sign Up'}
            </SubmitButton>
            {error && (
              <Typography color="error" variant="body1" align="center" gutterBottom>
                {error}
              </Typography>
            )}
          </StyledForm>
        )}
      </Formik>
    </>
  )
}

SignUpForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  isUserAdded: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
}

export default SignUpForm