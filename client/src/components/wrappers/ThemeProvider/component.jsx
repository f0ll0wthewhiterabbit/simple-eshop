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
      adminMain: '#fafafa',
      sidebar: '#fff',
      sidebarActiveMenu: 'rgba(0, 0, 0, 0.08)',
      table: '#fff',
      toolbar: {
        highlighted: '#fedfe9',
        button: '#727272',
      },
      tag: '#e0e0e0',
      uploadButton: '#e0e0e0',
    },
    font: {
      bold: '#1e1e1e',
      regular: '#727272',
      light: '#bdbdbd',
      extraLight: '#dfe2e3',
      contrast: '#fff',
      link: '#3f51b5',
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
        adminMain: '#0a101b',
        sidebar: '#282c35',
        sidebarActiveMenu: 'rgba(255, 255, 255, 0.14)',
        table: '#282c35',
        toolbar: {
          highlighted: '#3f51b5',
          button: '#fff',
        },
        tag: '#687579',
        uploadButton: '#687579',
      },
      font: {
        bold: '#fff',
        regular: 'rgba(255, 255, 255, 0.8)',
        light: 'rgba(255, 255, 255, 0.4)',
        extraLight: 'rgba(255, 255, 255, 0.22)',
        contrast: '#fff',
        link: '#8cc5ce',
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
