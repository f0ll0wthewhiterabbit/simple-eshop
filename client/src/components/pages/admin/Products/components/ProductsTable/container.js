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

const mapDispatchToProps = {
  setSelectedProducts: selectedProductsList => setSelectedProducts(selectedProductsList),
  fetchProducts: (page, itemsPerPage) => fetchProducts(page, itemsPerPage),
  setProductsPerPage: amount => setProductsPerPage(amount),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)
