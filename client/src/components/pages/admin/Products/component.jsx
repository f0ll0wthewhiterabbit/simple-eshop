import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProductsToolbar from './components/ProductsToolbar'
import ProductsTable from './components/ProductsTable'
import Loader from '../../../global/Loader'
import ErrorMessage from '../../../global/ErrorMessage'

const ProductsPage = ({ itemsPerPage, isLoading, error, fetchProducts }) => {
  useEffect(() => {
    fetchProducts(1, itemsPerPage)
  }, [fetchProducts, itemsPerPage])

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

ProductsPage.defaultProps = {
  error: null,
}

ProductsPage.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchProducts: PropTypes.func.isRequired,
}

export default ProductsPage
