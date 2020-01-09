import { connect } from 'react-redux'

import ProductsTable from './component'
import {
  setSelectedProducts,
  fetchProducts,
  setProductsPerPage,
} from '../../../../../../store/actions'

const mapStateToProps = state => ({
  productsList: state.getIn(['products', 'data']),
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  selectedProducts: state.getIn(['products', 'selected']),
})

const mapDispatchToProps = dispatch => ({
  setSelectedProducts: selectedProductsList => dispatch(setSelectedProducts(selectedProductsList)),
  fetchProducts: (currentPage, itemsPerPage) => dispatch(fetchProducts(currentPage, itemsPerPage)),
  setProductsPerPage: amount => dispatch(setProductsPerPage(amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)
