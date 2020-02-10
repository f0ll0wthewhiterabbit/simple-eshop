import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Grid, Typography } from '@material-ui/core'

import ProductCardContainer from './components/ProductCard'
import Loader from '../../components/global/Loader'
import FilterSelectContainer from './components/FilterSelect'
import PaginationContainer from './components/Pagination'
import { Wrapper, Heading, Toolbar, ContentWrapper, CardsWrapper } from './styles'

const CatalogPage = ({ products, error, isLoading, fetchProducts }) => {
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  let content

  if (error) {
    content = (
      <Typography variant="body1" align="center" data-test="errorMessage">
        Sorry, something went wrong...
      </Typography>
    )
  } else if (isLoading) {
    content = <Loader data-test="loader" />
  } else {
    content = (
      <>
        <CardsWrapper container spacing={4}>
          {products.map(product => {
            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <ProductCardContainer productData={product} data-test="productCard" />
              </Grid>
            )
          })}
        </CardsWrapper>
        <PaginationContainer />
      </>
    )
  }

  return (
    <Wrapper maxWidth="lg">
      <Heading variant="h4" component="h1" align="center">
        Catalog<span>.</span>
      </Heading>
      <Toolbar>
        <FilterSelectContainer />
        <PaginationContainer withLabel withNumbers={false} />
      </Toolbar>
      <ContentWrapper>{content}</ContentWrapper>
    </Wrapper>
  )
}

CatalogPage.defaultProps = {
  error: null,
}

CatalogPage.propTypes = {
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
  fetchProducts: PropTypes.func.isRequired,
}

export default CatalogPage
