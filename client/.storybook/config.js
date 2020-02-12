import { addDecorator, addParameters } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import './storybook.css'
import StylesDecorator from './styles-decorator'

addDecorator(StylesDecorator)
addDecorator(jsxDecorator)

addParameters({
  jsx: {
    skip: 2,
  },
  backgrounds: [
    { name: 'white', value: '#fff', default: true },
    { name: 'black', value: '#000' },
    { name: 'grey', value: '#b0bcc2' },
    { name: 'blue', value: '#00aced' },
  ],
})
