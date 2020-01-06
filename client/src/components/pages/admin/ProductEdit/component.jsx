import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import ImmutablePropTypes from 'react-immutable-proptypes'
import EditIcon from '@material-ui/icons/Edit'
import { Typography } from '@material-ui/core'

import ProductEditForm from './components/ProductEditForm'
import Loader from '../../../global/Loader'
import { Root, Wrapper, IconWrapper, Heading } from './styles'

const ProductEditPage = ({ isLoading, products, fetchProducts }) => {
  useEffect(() => {
    if (products.size === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.size])

  const { id } = useParams()

  if (isLoading) {
    return <Loader />
  }

  const product = products.find(it => it._id === id)

  if (!product) {
    return (
      <Wrapper>
        <Typography variant="body1" align="center">
          Sorry, there is no product
        </Typography>
      </Wrapper>
    )
  }

  const productData = {
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
    imageName: product.imageName,
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
        <ProductEditForm product={productData} />
      </Wrapper>
    </Root>
  )
}

ProductEditPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: ImmutablePropTypes.listOf(
    ImmutablePropTypes.recordOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      tags: ImmutablePropTypes.listOf(PropTypes.string),
      rating: ImmutablePropTypes.listOf(
        ImmutablePropTypes.recordOf({
          _id: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
        })
      ),
    }).isRequired
  ).isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default ProductEditPage
