import React from 'react'

import ErrorMessage from '../../components/global/ErrorMessage'
import { Wrapper, Icon } from './styles'

const BlogPage = () => {
  return (
    <Wrapper>
      <Icon />
      <ErrorMessage title="Blog is not ready yet" withoutIcon>
        Work in progress...
      </ErrorMessage>
    </Wrapper>
  )
}

export default BlogPage
