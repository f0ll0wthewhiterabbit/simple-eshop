import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import Profile from './component'

export default {
  title: 'Profile',
  component: Profile,
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
}

export const normal = () => (
  <Profile firstName={text('firstName', 'John')} lastName={text('lastName', 'Doe')} />
)
