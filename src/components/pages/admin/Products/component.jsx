import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProductsToolbar from './components/ProductsToolbar'
import Table from '../../../global/Table'
import Loader from '../../../global/Loader'
import ErrorMessage from '../../../global/ErrorMessage'

const ProductsPage = ({ productsList, isErrorInLoad, storageSetupError, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (isErrorInLoad) {
    return <ErrorMessage>Error in fetching products!</ErrorMessage>
  }

  if (storageSetupError) {
    return <ErrorMessage>Database setup error!</ErrorMessage>
  }

  if (productsList.length === 0) {
    return <Loader />
  }

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
      <Table rows={productsList} headCells={headCells} title="Products" />
    </>
  )
}

ProductsPage.propTypes = {
  productsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isErrorInLoad: PropTypes.bool.isRequired,
  storageSetupError: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default ProductsPage
