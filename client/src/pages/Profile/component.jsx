import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@material-ui/core'

import ProfileForm from './components/ProfileForm'
import { Wrapper, Heading, IconWrapper } from './styles'

const ProfilePage = ({ firstName, lastName }) => {
  const firstLetter = firstName.charAt(0).toUpperCase()
  const secondLetter = lastName.charAt(0).toUpperCase()

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <Heading variant="h4" component="h1" align="center">
          Profile
        </Heading>
        <IconWrapper data-test="avatar">{`${firstLetter} ${secondLetter}`}</IconWrapper>
        <ProfileForm />
      </Wrapper>
    </Container>
  )
}

ProfilePage.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

export default ProfilePage
