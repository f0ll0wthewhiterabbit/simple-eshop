import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { TextField, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { MAIN_PAGE_PATH } from '../../../constants'
import { StyledForm, SubmitButton, Progress } from './styles'

const SingInPage = ({ signInUser, isUserSignedUp, error, deleteUserDataFromStorage }) => {
  useEffect(() => {
    deleteUserDataFromStorage()
  }, [deleteUserDataFromStorage])

  const handleFormSubmit = values => {
    signInUser({
      email: values.email,
      password: values.password,
    })
  }

  if (isUserSignedUp) {
    return <Redirect to={MAIN_PAGE_PATH} />
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
            disabled={isSubmitting && error === null}
          >
            {isSubmitting && error === null ? <Progress size={20} /> : 'Sign In'}
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

SingInPage.propTypes = {
  signInUser: PropTypes.func.isRequired,
  deleteUserDataFromStorage: PropTypes.func.isRequired,
  isUserSignedUp: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
}

export default SingInPage
