import React from 'react'
import PropTypes from 'prop-types'
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined'

import { Wrapper, IconWrapper, Heading, Message } from './styles'

const ErrorMessage = ({ children, title }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <PriorityHighOutlinedIcon />
      </IconWrapper>
      {title && (
        <Heading variant="h5" component="h1">
          {title}
        </Heading>
      )}
      {children && <Message variant="h6">{children}</Message>}
    </Wrapper>
  )
}

ErrorMessage.defaultProps = {
  children: '',
  title: '',
}

ErrorMessage.propTypes = {
  children: PropTypes.string,
  title: PropTypes.string,
}

export default ErrorMessage
