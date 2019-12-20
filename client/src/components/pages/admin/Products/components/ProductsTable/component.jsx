import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

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
  productsList: ImmutablePropTypes.listOf(
    ImmutablePropTypes.recordOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number.isRequired,
      tags: ImmutablePropTypes.listOf(PropTypes.string),
      rating: ImmutablePropTypes.listOf(
        ImmutablePropTypes.recordOf({
          _id: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
  selectedProducts: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
}

export default ProductsTable
