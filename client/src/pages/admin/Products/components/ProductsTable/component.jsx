import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Table from '../../../../../components/global/Table'
import { STORE_FIELD_PRODUCTS } from '../../../../../constants'

const ProductsTable = ({
  productsList,
  itemsPerPage,
  currentPage,
  totalAmount,
  selectedProducts,
  setSelectedProducts,
  fetchProducts,
  setProductsPerPage,
}) => {
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
      rowsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalAmount={totalAmount}
      headCells={headCells}
      title="Products"
      storeFieldName={STORE_FIELD_PRODUCTS}
      selectedItems={selectedProducts}
      setSelectedItems={setSelectedProducts}
      fetchData={fetchProducts}
      setRowsPerPage={setProductsPerPage}
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
      ratingInfo: ImmutablePropTypes.recordOf({
        average: PropTypes.oneOfType([
          PropTypes.number.isRequired,
          PropTypes.oneOf([null]).isRequired,
        ]),
        votesAmount: PropTypes.number.isRequired,
        currentUserRating: PropTypes.number,
      }),
    })
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  selectedProducts: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  setProductsPerPage: PropTypes.func.isRequired,
}

export default ProductsTable
