import React from 'react'
import PropTypes from 'prop-types'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'

import { MAIN_PAGE_PATH } from '../../../constants'
import { Wrapper, IconWrapper, Heading, LinkWrapper, BackLink } from './styles'

const ErrorPage = ({ children }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <ErrorOutlineOutlinedIcon />
      </IconWrapper>
      <Heading variant="h5" component="h1">
        {children || 'Page Not Found'}
      </Heading>
      <LinkWrapper>
        <BackLink to={MAIN_PAGE_PATH}>Go back</BackLink>
      </LinkWrapper>
    </Wrapper>
  )
}

ErrorPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default ErrorPage
