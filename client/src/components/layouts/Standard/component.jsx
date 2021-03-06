import React from 'react'
import PropTypes from 'prop-types'

import HeaderContainer from '../../global/Header'
import Footer from '../../global/Footer'
import AlertDialogContainer from '../../global/AlertDialog'
import { Root, Main } from './styles'

const StandardLayout = ({ callForUserDeletionRequest, children }) => {
  return (
    <Root>
      <AlertDialogContainer title="Delete your account?" confirmMethod={callForUserDeletionRequest}>
        The remove request will be sent to the administrator. Unfortunately, your account will be
        deleted soon.
      </AlertDialogContainer>
      <HeaderContainer />
      <Main data-test="main">{children}</Main>
      <Footer />
    </Root>
  )
}

StandardLayout.propTypes = {
  callForUserDeletionRequest: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default StandardLayout
