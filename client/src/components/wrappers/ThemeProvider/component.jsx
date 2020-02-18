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

const darkTheme = {
  ...defaultTheme,
  ...{
    colors: {
      accent: '#687579',
      background: {
        header: '#282c35',
        main: '#282c35',
        footer: '#191c22',
        productCard: '#191c22',
        userMenu: '#191c22',
        alertDialog: '#2b3345',
        button: {
          normal: '#3f51b5',
          disabled: '#191c22',
        },
      },
      font: {
        bold: '#fff',
        regular: 'rgba(255, 255, 255, 0.8)',
        light: 'rgba(255, 255, 255, 0.4)',
        extraLight: 'rgba(255, 255, 255, 0.22)',
        contrast: '#fff',
      },
    },
  },
}

const ThemeProviderWrapper = ({ isDarkTheme, children }) => {
  const theme = isDarkTheme ? darkTheme : defaultTheme
  const themeWithMuiRules = createMuiTheme(theme)

  return (
    <ThemeProvider theme={themeWithMuiRules}>
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  )
}

ThemeProviderWrapper.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default ThemeProviderWrapper
