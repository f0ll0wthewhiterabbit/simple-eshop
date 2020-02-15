import React from 'react'

import ErrorMessage from '../../components/global/ErrorMessage'
import { Wrapper, Icon } from './styles'

const ContactPage = () => {
  return (
    <Wrapper>
      <Icon />
      <ErrorMessage title="Contact page is not ready yet" withoutIcon>
        Sorry for the inconvenience...
      </ErrorMessage>
    </Wrapper>
  )
}

export default ContactPage
