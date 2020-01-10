import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Grid, Typography } from '@material-ui/core'

import ProductCard from './components/ProductCard'
import Loader from '../../global/Loader'
import FilterSelect from './components/FilterSelect'
import Pagination from './components/Pagination'
import { Wrapper, Heading } from './styles'

const CatalogPage = ({ products, error, isLoading, fetchProducts }) => {
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  let content

  if (error || products.size === 0) {
    content = (
      <Typography variant="body1" align="center">
        Sorry, there are no products yet
      </Typography>
    )
  } else if (isLoading) {
    content = <Loader />
  } else {
    content = (
      <>
        <Grid container spacing={4}>
          {products.map(product => {
            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <ProductCard productData={product} />
              </Grid>
            )
          })}
        </Grid>
        <Pagination />
      </>
    )
  }

  return (
    <Wrapper maxWidth="lg">
      <Heading variant="h4" component="h1" align="center">
        Catalog
      </Heading>
      <FilterSelect />
      {content}
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
      rating: ImmutablePropTypes.listOf(
        ImmutablePropTypes.recordOf({
          _id: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  isLoading: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default CatalogPage
