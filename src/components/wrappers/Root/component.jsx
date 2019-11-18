import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Loader from '../../global/Loader'

const Root = ({ isStorageDataReady, storageSetupError, fetchDatabaseToStorage, children }) => {
  useEffect(() => {
    fetchDatabaseToStorage()
  }, [fetchDatabaseToStorage])

  if (isStorageDataReady || storageSetupError) {
    return children
  }

  return <Loader />
}

Root.propTypes = {
  isStorageDataReady: PropTypes.bool.isRequired,
  storageSetupError: PropTypes.bool.isRequired,
  fetchDatabaseToStorage: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default Root
