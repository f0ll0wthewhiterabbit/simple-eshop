import React from 'react'
import Profile from './component'

export default {
  title: 'Profile',
  component: Profile,
  excludeStories: /.*Data$/,
}

export const profileData = {
  firstName: 'John',
  lastName: 'Doe',
}

export const normal = () => <Profile {...profileData} />
