import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import AlertDialog from '../../global/AlertDialog'
import { Root, Main } from './styles'

const StandardLayout = ({ children }) => {
  return (
    <Root>
      <AlertDialog title="Delete your account?">
        The remove request will be sent to the administrator. Unfortunately, your account will be
        deleted soon.
      </AlertDialog>
      <Header />
      <Main data-test="main">{children}</Main>
      <Footer />
    </Root>
  )
}

StandardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default StandardLayout
