import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import AlertDialog from '../../global/AlertDialog'
import { Root, Main } from './styles'

const StandardLayout = ({ requestUserDeletion, children }) => {
  return (
    <Root>
      <AlertDialog title="Delete your account?" confirmMethod={requestUserDeletion}>
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
  requestUserDeletion: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default StandardLayout
