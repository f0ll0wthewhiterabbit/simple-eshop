import React from 'react'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import ProductAddFormContainer from './components/ProductAddForm'
import { Root, Wrapper, IconWrapper, Heading } from './styles'

const ProductAddPage = () => {
  return (
    <Root maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LibraryAddIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5" gutterBottom>
          Add Product
        </Heading>
        <ProductAddFormContainer />
      </Wrapper>
    </Root>
  )
}

export default ProductAddPage
