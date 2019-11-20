import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProductsToolbar from './components/ProductsToolbar'
import Loader from '../../../global/Loader'
import ErrorMessage from '../../../global/ErrorMessage'
import ProductsTable from '../../../tables/Products'

const ProductsPage = ({ isLoading, isErrorInLoad, storageSetupError, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (isErrorInLoad) {
    return <ErrorMessage>Error in fetching products!</ErrorMessage>
  }

  if (storageSetupError) {
    return <ErrorMessage>Database setup error!</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <ProductsToolbar />
      <ProductsTable />
    </>
  )
}

ProductsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isErrorInLoad: PropTypes.bool.isRequired,
  storageSetupError: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default ProductsPage
