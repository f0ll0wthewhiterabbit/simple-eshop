import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs/react'

import ErrorMessage from './component'

export default {
  title: 'ErrorMessage',
  component: ErrorMessage,
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
}

export const errorMessageData = {
  withoutIcon: false,
  title: 'Test title',
  children: 'Test message',
}

export const normal = () => <ErrorMessage {...object('errorMessage', { ...errorMessageData })} />
export const withoutIcon = () => <ErrorMessage {...errorMessageData} withoutIcon />
export const iconOnly = () => <ErrorMessage />
export const withTitle = () => <ErrorMessage title={errorMessageData.title} />
export const withMessage = () => <ErrorMessage>{errorMessageData.children}</ErrorMessage>
export const withTitleAndMessage = () => <ErrorMessage {...errorMessageData} />
