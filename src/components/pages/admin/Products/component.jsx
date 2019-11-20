import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProductsToolbar from './components/ProductsToolbar'
import Loader from '../../../global/Loader'
import ErrorMessage from '../../../global/ErrorMessage'
import ProductsTable from '../../../tables/Products'

const ProductsPage = ({ isLoading, error, fetchProducts }) => {
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
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
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchProducts: PropTypes.func.isRequired,
}

export default ProductsPage
