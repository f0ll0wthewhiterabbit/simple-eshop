import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Loader from '../../global/Loader'

const Root = ({ initialize, isStorageDataReady, error, children }) => {
  useEffect(() => {
    initialize()
  }, [initialize])

  if (isStorageDataReady || error) {
    return children
  }

  return <Loader />
}

Root.propTypes = {
  isStorageDataReady: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  initialize: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default Root
