import React from 'react'
import PropTypes from 'prop-types'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import ProductAddForm from './components/ProductAddForm'
import Loader from '../../../global/Loader'
import { Root, Wrapper, IconWrapper, Heading } from './styles'

const ProductAddPage = ({ isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  return (
    <Root maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LibraryAddIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5" gutterBottom>
          Add Product
        </Heading>
        <ProductAddForm />
      </Wrapper>
    </Root>
  )
}

ProductAddPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default ProductAddPage
