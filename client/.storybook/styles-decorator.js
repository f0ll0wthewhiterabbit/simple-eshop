import React from 'react'
import { StylesProvider } from '@material-ui/core/styles'

import ThemeProvider from '../src/components/wrappers/ThemeProvider'

const StylesDecorator = storyFn => (
  <StylesProvider injectFirst>
    <ThemeProvider>{storyFn()}</ThemeProvider>
  </StylesProvider>
)

export default StylesDecorator
