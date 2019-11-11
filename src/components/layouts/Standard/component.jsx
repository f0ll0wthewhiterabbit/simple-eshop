import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Header from '../../blocks/global/Header'
import Footer from '../../blocks/global/Footer'
import AlertDialog from '../../blocks/global/AlertDialog'
import Root from './styles'

const StandardLayout = ({ children }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpened(true)
  }

  const handleModalClose = () => {
    setIsModalOpened(false)
  }

  return (
    <Root>
      <AlertDialog
        show={isModalOpened}
        handleModalClose={handleModalClose}
        title="Delete your account?"
      >
        The remove request will be sent to the administrator. Unfortunately, your account will be
        deleted soon.
      </AlertDialog>
      <Header handleModalOpen={handleModalOpen} />
      <main>{children}</main>
      <Footer />
    </Root>
  )
}

StandardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
}

export default StandardLayout
