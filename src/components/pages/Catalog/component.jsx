import React from 'react'
import { Grid } from '@material-ui/core'

import ProductCard from '../../blocks/ProductCard'
import mockProductList from '../../../data/products.json'
import { Wrapper, Header } from './styles'

const CatalogPage = () => {
  return (
    <Wrapper maxWidth="lg">
      <Header variant="h4" component="h1" align="center">
        Catalog
      </Header>
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
