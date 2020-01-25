import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import ProductEditFormContainer from './components/ProductEditForm'
import Loader from '../../../components/global/Loader'
import { Root, Wrapper, IconWrapper, Heading } from './styles'

const ProductEditPage = ({ isLoading, product, fetchProduct }) => {
  const { id } = useParams()

  useEffect(() => {
    fetchProduct(id)
  }, [fetchProduct, id])

  if (isLoading) {
    return <Loader />
  }

  if (!product.title) {
    return (
      <Wrapper>
        <Typography variant="body1" align="center">
          Sorry, there is no product
        </Typography>
      </Wrapper>
    )
  }

  const productData = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageName: product.imageName,
    price: product.price || 0,
    tags: product.tags.toJS(),
  }

  return (
    <Root maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <EditIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5" gutterBottom>
          Edit Product
        </Heading>
        <ProductEditFormContainer product={productData} />
      </Wrapper>
    </Root>
  )
}

ProductEditPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  product: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageName: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.oneOf([null]).isRequired]),
    tags: ImmutablePropTypes.listOf(PropTypes.string),
  }).isRequired,
  fetchProduct: PropTypes.func.isRequired,
}

export default ProductEditPage
