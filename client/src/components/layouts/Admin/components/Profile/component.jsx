import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import PersonIcon from '@material-ui/icons/Person'

import { Wrapper, ProfileAvatar } from './styles'

const Profile = ({ firstName, lastName }) => {
  const user = {
    firstName,
    lastName,
    role: 'Administrator',
    avatar: <PersonIcon />,
  }

  return (
    <Wrapper>
      <ProfileAvatar>{user.avatar}</ProfileAvatar>
      <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography variant="caption">{user.role}</Typography>
    </Wrapper>
  )
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

export default Profile
