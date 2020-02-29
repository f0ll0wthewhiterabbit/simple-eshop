import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import SearchForm from '../../../../../components/global/SearchForm'
import { PAGE_PATHS } from '../../../../../constants'
import Wrapper from './styles'

const ProductsToolbar = ({
  itemsPerPage,
  lastSearchQuery,
  fetchProducts,
  setProductsSearchQuery,
}) => {
  return (
    <Wrapper>
      <SearchForm
        placeholder="Search products by tags"
        itemsPerPage={itemsPerPage}
        searchMethod={fetchProducts}
        setSearchQueryMethod={setProductsSearchQuery}
        initialValue={lastSearchQuery}
      />
      <Button
        component={Link}
        to={PAGE_PATHS.ADMIN_PRODUCT_ADD}
        color="primary"
        variant="contained"
      >
        Add product
      </Button>
    </Wrapper>
  )
}

ProductsToolbar.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  lastSearchQuery: PropTypes.string.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  setProductsSearchQuery: PropTypes.func.isRequired,
}

export default ProductsToolbar
