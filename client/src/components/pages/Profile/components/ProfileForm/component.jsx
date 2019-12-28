import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { TextField, Grid, Typography } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { StyledForm, SubmitButton, Progress } from './styles'

const ProfileForm = ({ firstName, lastName, updateUser, error, history }) => {
  const handleFormSubmit = values => {
    updateUser(
      {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      history
    )
  }

  const isDataChanged = (newFirstName, newLastName) => {
    if (newFirstName !== firstName) {
      return true
    }

    if (newLastName !== lastName) {
      return true
    }

    return false
  }

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
        <StyledForm as={Form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !isDataChanged(values.firstName, values.lastName) || (isSubmitting && error === null)
            }
          >
            {isSubmitting && error === null ? <Progress size={20} /> : 'Save changes'}
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

ProfileForm.defaultProps = {
  error: null,
}

ProfileForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  updateUser: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
}

export default withRouter(ProfileForm)