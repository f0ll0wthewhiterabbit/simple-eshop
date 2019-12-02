import React from 'react'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH } from '../../../constants'
import ErrorMessage from '../../global/ErrorMessage'
import { Wrapper, LinkWrapper, BackLink } from './styles'

const ErrorPage = ({ location }) => {
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
      <ErrorMessage title={title || 'Page not found'}>{message && message}</ErrorMessage>
      <LinkWrapper>
        <BackLink to={backTo || MAIN_PAGE_PATH}>Go back</BackLink>
      </LinkWrapper>
    </Wrapper>
  )
}

ErrorPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string.isRequired,
      backTo: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  }),
}

export default ErrorPage
