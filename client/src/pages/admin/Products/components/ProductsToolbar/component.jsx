import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import SearchForm from '../../../../../components/global/SearchForm'
import { ADMIN_PRODUCT_ADD_PAGE_PATH } from '../../../../../constants'
import Wrapper from './styles'

const ProductsToolbar = ({ itemsPerPage, fetchProducts, setProductsSearchQuery }) => {
  return (
    <Wrapper>
      <SearchForm
        placeholder="Search products by tags"
        itemsPerPage={itemsPerPage}
        searchMethod={fetchProducts}
        setSearchQueryMethod={setProductsSearchQuery}
      />
      <Button component={Link} to={ADMIN_PRODUCT_ADD_PAGE_PATH} color="primary" variant="contained">
        Add product
      </Button>
    </Wrapper>
  )
}

ProductsToolbar.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  setProductsSearchQuery: PropTypes.func.isRequired,
}

export default ProductsToolbar
