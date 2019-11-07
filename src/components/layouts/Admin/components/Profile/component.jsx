import React from 'react'
import Typography from '@material-ui/core/Typography'
import PersonIcon from '@material-ui/icons/Person'

import { Wrapper, ProfileAvatar } from './styles'

const Profile = () => {
  const user = {
    name: 'John Doe',
    role: 'Administrator',
    avatar: <PersonIcon />,
  }

  return (
    <Wrapper>
      <ProfileAvatar>{user.avatar}</ProfileAvatar>
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="caption">{user.role}</Typography>
    </Wrapper>
  )
}

export default Profile
