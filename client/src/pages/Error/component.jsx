import React from 'react'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH, ADMIN_PRODUCTS_PAGE_PATH } from '../../constants'
import ErrorMessage from '../../components/global/ErrorMessage'
import { Wrapper, LinkWrapper, BackLink } from './styles'

const ErrorPage = ({ isAdmin, location }) => {
  const defaultPagePath = isAdmin ? ADMIN_PRODUCTS_PAGE_PATH : MAIN_PAGE_PATH
  let title
  let backTo
  let message

  if (location && location.state) {
    title = location.state.title
    backTo = location.state.backTo
    message = location.state.message
  }

  return (
    <Wrapper>
      <ErrorMessage title={title || 'Page not found'} data-test="errorMessage">
        {message && message}
      </ErrorMessage>
      <LinkWrapper>
        <BackLink to={backTo || defaultPagePath} data-test="backLink">
          Go back
        </BackLink>
      </LinkWrapper>
    </Wrapper>
  )
}

ErrorPage.defaultProps = {
  location: null,
}

ErrorPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.shape({
      state: PropTypes.shape({
        title: PropTypes.string.isRequired,
        backTo: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    }),
    PropTypes.oneOf([null]).isRequired,
  ]),
}

export default ErrorPage
