import React from 'react'

import { IntroWrapper, Heading, Subheading, Slogan } from './styles'

const IntroSection = () => {
  return (
    <IntroWrapper>
      <Heading variant="h1">
        Simpl<span>e</span>shop<span>.</span>
      </Heading>
      <Subheading variant="h2">Online store</Subheading>
      <Slogan>We sell, You buy</Slogan>
    </IntroWrapper>
  )
}

export default IntroSection
