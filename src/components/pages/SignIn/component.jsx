import React from 'react'
import { TextField, Link, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { Wrapper, IconWrapper, Form, SubmitButton } from './styles'

const SingInPage = () => {
  return (
    <Container maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LockOutlinedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <SubmitButton type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </SubmitButton>
          <Typography color="textSecondary" variant="body2" align="center">
            Don&apos;t have an account?{' '}
            <Link href="#sign-up" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default SingInPage
