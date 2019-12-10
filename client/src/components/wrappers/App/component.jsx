import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ThemeProviderWrapper from '../ThemeProvider'
import Router from '../../../Router'
import Loader from '../../global/Loader'

const App = ({ isAuthenticated, error, authenticate }) => {
  useEffect(() => {
    authenticate()
  }, [authenticate])

  if (isAuthenticated || error !== null) {
    return (
      <ThemeProviderWrapper>
        <Router />
      </ThemeProviderWrapper>
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
  authenticate: PropTypes.func.isRequired,
}

export default App
