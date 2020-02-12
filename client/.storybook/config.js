import { addDecorator, addParameters } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import StylesDecorator from './styles-decorator'

addDecorator(StylesDecorator)
addDecorator(jsxDecorator)

addParameters({
  jsx: {
    skip: 2,
  },
})
