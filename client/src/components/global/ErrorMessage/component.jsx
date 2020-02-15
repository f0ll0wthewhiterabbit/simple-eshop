import React from 'react'
import PropTypes from 'prop-types'
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined'

import { Wrapper, IconWrapper, Heading, Message } from './styles'

const ErrorMessage = ({ withoutIcon, children, title }) => {
  return (
    <Wrapper>
      {!withoutIcon && (
        <IconWrapper>
          <PriorityHighOutlinedIcon />
        </IconWrapper>
      )}
      {title && (
        <Heading variant="h5" component="h1" data-test="heading">
          {title}
        </Heading>
      )}
      {children && (
        <Message variant="h6" data-test="message">
          {children}
        </Message>
      )}
    </Wrapper>
  )
}

ErrorMessage.defaultProps = {
  withoutIcon: false,
  children: '',
  title: '',
}

ErrorMessage.propTypes = {
  withoutIcon: PropTypes.bool,
  children: PropTypes.string,
  title: PropTypes.string,
}

export default ErrorMessage
