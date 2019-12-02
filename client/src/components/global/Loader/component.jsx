import React from 'react'

import { Root, CircularLoader } from './styles'

const Loader = () => {
  return (
    <Root>
      <CircularLoader disableShrink size={36} thickness={4} />
    </Root>
  )
}

export default Loader
