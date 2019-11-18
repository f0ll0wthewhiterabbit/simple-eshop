import React from 'react'

import { MAIN_PAGE_PATH } from '../../../constants'
import ErrorMessage from '../../global/ErrorMessage'
import { Wrapper, LinkWrapper, BackLink } from './styles'

const ErrorPage = () => {
  return (
    <Wrapper>
      <ErrorMessage title="Page not found" />
      <LinkWrapper>
        <BackLink to={MAIN_PAGE_PATH}>Go back</BackLink>
      </LinkWrapper>
    </Wrapper>
  )
}

export default ErrorPage
