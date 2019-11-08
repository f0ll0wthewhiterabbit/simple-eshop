import React from 'react'

import ProductsToolbar from './components/ProductsToolbar'
import Table from '../../../blocks/global/Table'
import mockProductList from '../../../../data/products.json'

const ProductsPage = () => {
  const headCells = [
    { id: 'title', label: 'Title', isNumeric: false },
    { id: 'description', label: 'Description', isNumeric: false },
    { id: 'price', label: 'Price', isNumeric: true },
    { id: 'rating', label: 'Rating', isNumeric: true },
    { id: 'tags', label: 'Tags', isNumeric: false },
    { id: 'image', label: 'Picture', isNumeric: false },
  ]

  return (
    <>
      <ProductsToolbar />
      <Table rows={mockProductList} headCells={headCells} title="Products" />
    </>
  )
}

export default ProductsPage
