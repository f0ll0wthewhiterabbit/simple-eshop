import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import { Wrapper, ProfileAvatar } from './styles'

const Profile = ({ firstName, lastName }) => {
  const firstLetter = firstName.charAt(0).toUpperCase()
  const secondLetter = lastName.charAt(0).toUpperCase()

  return (
    <Wrapper>
      <ProfileAvatar>{`${firstLetter} ${secondLetter}`}</ProfileAvatar>
      <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="caption">Administrator</Typography>
    </Wrapper>
  )
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

export default Profile
