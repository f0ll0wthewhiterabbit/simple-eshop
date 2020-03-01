import { connect } from 'react-redux'

import ProductsTable from './component'
import {
  setSelectedProducts,
  fetchProductsRequest,
  setProductsPerPage,
} from '../../../../../store/actions'

const mapStateToProps = state => ({
  productsList: state.getIn(['products', 'data']),
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  selectedProducts: state.getIn(['products', 'selected']),
  lastSearchQuery: state.getIn(['products', 'lastSearchQuery']),
})

const mapDispatchToProps = {
  setSelectedProducts: selectedProductsList => setSelectedProducts(selectedProductsList),
  fetchProductsRequest: (page, itemsPerPage) => fetchProductsRequest(page, itemsPerPage),
  setProductsPerPage: amount => setProductsPerPage(amount),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable)
