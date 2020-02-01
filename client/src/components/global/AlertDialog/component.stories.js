import React from 'react'
import { action } from '@storybook/addon-actions'

import AlertDialog from './component'

export default {
  title: 'AlertDialog',
  component: AlertDialog,
  excludeStories: /.*Data$/,
}

export const alertDialogData = {
  isModalOpened: true,
  title: 'Test title',
  childrenMessage: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
  Consectetur quae omnis sunt voluptatum sequi quos ducimus soluta quasi ipsum suscipit!
  Fugit, facilis? Voluptates, et? Et adipisci labore pariatur in laborum.`,
}

const { isModalOpened, title, childrenMessage } = alertDialogData

export const actionsData = {
  closeModal: action('closeModal'),
  confirmMethod: action('confirmMethod'),
}

export const normal = () => (
  <AlertDialog isModalOpened={isModalOpened} title={title} {...actionsData}>
    {childrenMessage}
  </AlertDialog>
)
export const withoutMessage = () => (
  <AlertDialog isModalOpened={isModalOpened} title={title} {...actionsData} />
)
export const withMessageAsNode = () => (
  <AlertDialog isModalOpened={isModalOpened} title={title} {...actionsData}>
    <i>{childrenMessage}</i>
    <ul>
      <li>Fitst</li>
      <li>Second</li>
    </ul>
  </AlertDialog>
)
