import React from 'react'

import ErrorMessage from '../../components/global/ErrorMessage'
import { Wrapper, Icon } from './styles'

const AboutPage = () => {
  return (
    <Wrapper>
      <Icon />
      <ErrorMessage title="About page is not ready yet" withoutIcon>
        Coming soon...
      </ErrorMessage>
    </Wrapper>
  )
}

export default AboutPage
