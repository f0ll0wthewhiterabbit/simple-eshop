import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme()

const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <CssBaseline />
      {children}
    </>
  </ThemeProvider>
)

ThemeProviderWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
}

export default ThemeProviderWrapper
