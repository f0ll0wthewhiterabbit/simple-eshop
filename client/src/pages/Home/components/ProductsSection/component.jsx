import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Grid } from '@material-ui/core'

import Loader from '../../../../components/global/Loader/component'
import { PAGE_PATHS } from '../../../../constants'
import { BASE_URL } from '../../../../utils/api'
import formatPrice from '../../../../utils/formatPrice'
import {
  Wrapper,
  Heading,
  ImageWrapper,
  ProductImage,
  ProductHeading,
  ProductPrice,
  ProductsWrapper,
  ProductsLink,
  ErrorMessage,
} from './styles'

const ProductsSection = ({ products, error, isLoading, fetchProductsRequest }) => {
  useEffect(() => {
    fetchProductsRequest(1, 3)
  }, [fetchProductsRequest])

  let content

  if (error) {
    content = <ErrorMessage variant="body1">Sorry, something went wrong...</ErrorMessage>
  } else if (isLoading) {
    content = <Loader />
  } else if (products.size > 0) {
    content = products.slice(0, 3).map(product => (
      <Grid key={product._id} item xs={12} md={4}>
        <ImageWrapper>
          <ProductImage
            src={`${BASE_URL}/products/${product._id}/${product.imageName}`}
            alt={product.title}
          />
        </ImageWrapper>
        <ProductHeading variant="h6">{product.title}</ProductHeading>
        <ProductPrice variant="body1">{formatPrice(product.price)}</ProductPrice>
      </Grid>
    ))
  }

  return (
    <Wrapper>
      <Heading variant="h3">
        Latest products<span>.</span>
      </Heading>

      <ProductsWrapper container spacing={3}>
        {content}
      </ProductsWrapper>
      <ProductsLink to={PAGE_PATHS.CATALOG}>Show All</ProductsLink>
    </Wrapper>
  )
}

ProductsSection.defaultProps = {
  error: null,
}

ProductsSection.propTypes = {
  products: ImmutablePropTypes.listOf(
    ImmutablePropTypes.recordOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      tags: ImmutablePropTypes.listOf(PropTypes.string),
      ratingInfo: ImmutablePropTypes.recordOf({
        average: PropTypes.oneOfType([
          PropTypes.number.isRequired,
          PropTypes.oneOf([null]).isRequired,
        ]),
        votesAmount: PropTypes.number.isRequired,
        currentUserRating: PropTypes.number,
      }),
    })
  ).isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  isLoading: PropTypes.bool.isRequired,
  fetchProductsRequest: PropTypes.func.isRequired,
}

export default ProductsSection
