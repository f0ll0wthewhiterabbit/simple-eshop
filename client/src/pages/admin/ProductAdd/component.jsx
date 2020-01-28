import React from 'react'
import PropTypes from 'prop-types'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'

import ProductAddFormContainer from './components/ProductAddForm'
import Loader from '../../../components/global/Loader'
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
        <ProductAddFormContainer />
      </Wrapper>
    </Root>
  )
}

ProductAddPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

export default ProductAddPage