import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ProductsToolbarContainer from './components/ProductsToolbar'
import ProductsTableContainer from './components/ProductsTable'
import Loader from '../../../components/global/Loader'
import ErrorMessage from '../../../components/global/ErrorMessage'

const ProductsPage = ({
  itemsPerPage,
  isLoading,
  error,
  fetchProductsRequest,
  setProductsSearchQuery,
}) => {
  useEffect(() => {
    setProductsSearchQuery('')
  }, [setProductsSearchQuery])

  useEffect(() => {
    fetchProductsRequest(1, itemsPerPage)
  }, [fetchProductsRequest, itemsPerPage])

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <ProductsToolbarContainer />
      <ProductsTableContainer />
    </>
  )
}

ProductsPage.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchProductsRequest: PropTypes.func.isRequired,
  setProductsSearchQuery: PropTypes.func.isRequired,
}

export default ProductsPage
