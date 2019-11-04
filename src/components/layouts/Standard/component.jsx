import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../blocks/global/Header'

const StandardLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
)

StandardLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element.isRequired]),
}

export default StandardLayout
