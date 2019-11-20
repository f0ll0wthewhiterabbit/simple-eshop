import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Loader from '../../global/Loader'

const Root = ({ isStorageDataReady, error, fetchDatabaseToStorage, children }) => {
  useEffect(() => {
    fetchDatabaseToStorage()
  }, [fetchDatabaseToStorage])

  if (isStorageDataReady || error) {
    return children
  }

  return <Loader />
}

Root.propTypes = {
  isStorageDataReady: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchDatabaseToStorage: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default Root
