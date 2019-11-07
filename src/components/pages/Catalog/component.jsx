import React from 'react'
import { Grid } from '@material-ui/core'

import ProductCard from './components/ProductCard'
import mockProductList from '../../../data/products.json'
import { Wrapper, Heading } from './styles'

const CatalogPage = () => {
  return (
    <Wrapper maxWidth="lg">
      <Heading variant="h4" component="h1" align="center">
        Catalog
      </Heading>
      <Grid container spacing={4}>
        {mockProductList.map(product => {
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
    </Wrapper>
  )
}

export default CatalogPage
