import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'

const defaultTheme = {
  sizing: {
    sidebarWidth: '240px',
    headerTopHeight: '104px',
  },
  colors: {
    accent: '#b0bcc2',
    background: {
      header: '#fff',
      main: '#fafafa',
      footer: '#222121',
      productCard: '#fff',
      userMenu: '#fff',
      alertDialog: '#fff',
      button: {
        normal: '#3f51b5',
        disabled: '#dcdcdc',
      },
    },
    font: {
      bold: '#1e1e1e',
      regular: '#727272',
      light: '#bdbdbd',
      extraLight: '#dfe2e3',
      contrast: '#fff',
    },
  },
  font: {
    family: `'Montserrat', sans-serif`,
  },
}

const theme = createMuiTheme(defaultTheme)

const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <CssBaseline />
      {children}
    </>
  </ThemeProvider>
)

ThemeProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProviderWrapper
