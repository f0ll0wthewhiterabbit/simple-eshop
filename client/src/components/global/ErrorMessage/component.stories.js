import React from 'react'
import ErrorMessage from './component'

export default {
  title: 'ErrorMessage',
  component: ErrorMessage,
  excludeStories: /.*Data$/,
}

export const errorMessageData = {
  title: 'Test title',
  children: 'Test message',
}

export const empty = () => <ErrorMessage />
export const withTitle = () => <ErrorMessage title={errorMessageData.title} />
export const withMessage = () => <ErrorMessage>{errorMessageData.children}</ErrorMessage>
export const withTitleAndMessage = () => <ErrorMessage {...errorMessageData} />
