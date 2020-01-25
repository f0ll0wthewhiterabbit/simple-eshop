import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { useParams } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import Loader from '../../../components/global/Loader'
import ErrorMessage from '../../../components/global/ErrorMessage'
import ProductRatingTableContainer from './components/ProductRatingTable'

import { Wrapper } from './styles'

const ProductRatingPage = ({
  itemsPerPage,
  currentProduct,
  isLoading,
  error,
  fetchProductRating,
}) => {
  const { id } = useParams()

  useEffect(() => {
    fetchProductRating(id, 1, itemsPerPage)
  }, [fetchProductRating, id, itemsPerPage])

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  if (!currentProduct.title || currentProduct.rating.size === 0) {
    return (
      <Wrapper>
        <Typography variant="body1" align="center">
          Sorry, there is no rating data for this product
        </Typography>
      </Wrapper>
    )
  }

  return (
    <>
      <ProductRatingTableContainer productData={currentProduct} />
    </>
  )
}

ProductRatingPage.defaultProps = {
  error: null,
}

ProductRatingPage.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  currentProduct: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: ImmutablePropTypes.listOf(
      ImmutablePropTypes.recordOf({
        _id: PropTypes.string.isRequired,
        user: PropTypes.oneOfType([
          ImmutablePropTypes.recordOf({
            _id: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
          }).isRequired,
          PropTypes.oneOf([null]).isRequired,
        ]),
        stars: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  fetchProductRating: PropTypes.func.isRequired,
}

export default ProductRatingPage
