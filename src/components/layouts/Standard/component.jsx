import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../blocks/global/Header'
import Footer from '../../blocks/global/Footer'
import Root from './styles'

const StandardLayout = ({ children }) => (
  <Root>
    <Header />
    <main>{children}</main>
    <Footer />
  </Root>
)

StandardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
}

export default StandardLayout
