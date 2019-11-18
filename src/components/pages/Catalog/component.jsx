import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'

import ProductCard from './components/ProductCard'
import Loader from '../../global/Loader'
import { Wrapper, Heading } from './styles'

const CatalogPage = ({ products, isErrorInLoad, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  let content

  if (isErrorInLoad) {
    content = (
      <Typography variant="body1" align="center">
        Sorry, there are no products yet
      </Typography>
    )
  } else if (products.length === 0) {
    content = <Loader />
  } else {
    content = (
      <Grid container spacing={4}>
        {products.map(product => {
          const { id, title, description, tags, price, rating, image } = product

          return (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <ProductCard
                title={title}
                description={description}
                tags={tags}
                price={price}
                rating={rating}
                imageSrc={image}
              />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <Wrapper maxWidth="lg">
      <Heading variant="h4" component="h1" align="center">
        Catalog
      </Heading>
      {content}
    </Wrapper>
  )
}

CatalogPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  isErrorInLoad: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default CatalogPage
