import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Table from '../../../../../global/Table'
import { STORE_FIELD_PRODUCTS } from '../../../../../../constants'

const ProductsTable = ({ productsList, selectedProducts, setSelectedProducts }) => {
  const headCells = [
    { id: 'title', label: 'Title', isNumeric: false },
    { id: 'description', label: 'Description', isNumeric: false },
    { id: 'price', label: 'Price', isNumeric: true },
    { id: 'rating', label: 'Rating', isNumeric: true },
    { id: 'tags', label: 'Tags', isNumeric: false },
    { id: 'image', label: 'Picture', isNumeric: false },
  ]

  return (
    <Table
      rows={productsList}
      headCells={headCells}
      title="Products"
      storeFieldName={STORE_FIELD_PRODUCTS}
      selectedItems={selectedProducts}
      setSelectedItems={setSelectedProducts}
    />
  )
}

ProductsTable.propTypes = {
  productsList: PropTypes.instanceOf(Immutable.List).isRequired,
  selectedProducts: PropTypes.instanceOf(Immutable.List).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
}

export default ProductsTable
