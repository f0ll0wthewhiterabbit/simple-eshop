import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import TableContainer from '../../../../../components/global/Table'
import { FIELDS } from '../../../../../constants'

const ProductsTable = ({
  productsList,
  itemsPerPage,
  currentPage,
  totalAmount,
  selectedProducts,
  lastSearchQuery,
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
  const titleAddition = lastSearchQuery !== '' ? ` - result for "${lastSearchQuery}" tags` : ''
  const title = `Products${titleAddition}`

  return (
    <TableContainer
      rows={productsList}
      rowsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalAmount={totalAmount}
      headCells={headCells}
      title={title}
      storeFieldName={FIELDS.STORE_PRODUCTS}
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
  lastSearchQuery: PropTypes.string.isRequired,
  setSelectedProducts: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  setProductsPerPage: PropTypes.func.isRequired,
}

export default ProductsTable
