import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ThemeProviderContainer from '../ThemeProvider'
import Router from '../../../Router'
import Loader from '../../global/Loader'

const App = ({ isAuthenticated, error, initializeRequest }) => {
  useEffect(() => {
    initializeRequest()
  }, [initializeRequest])

  if (isAuthenticated || error !== null) {
    return (
      <ThemeProviderContainer>
        <Router />
      </ThemeProviderContainer>
    )
  }

  return <Loader />
}

App.defaultProps = {
  error: null,
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  initializeRequest: PropTypes.func.isRequired,
}

export default App
