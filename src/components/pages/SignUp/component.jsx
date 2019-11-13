import React from 'react'
import { TextField, Grid, Typography, Container } from '@material-ui/core'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'

import { SING_IN_PAGE_PATH } from '../../../constants'
import { Wrapper, IconWrapper, Form, SubmitButton, SignInLink } from './styles'

const SignUpPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <PersonAddRoundedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <SubmitButton type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </SubmitButton>
          <Typography color="textSecondary" variant="body2" align="center">
            Already have an account? <SignInLink to={SING_IN_PAGE_PATH}>Sign In</SignInLink>
          </Typography>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default SignUpPage
