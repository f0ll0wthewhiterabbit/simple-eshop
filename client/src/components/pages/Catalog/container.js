import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProducts } from '../../../store/actions'

const mapStateToProps = state => ({
  products: state.getIn(['products', 'data']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  totalPages: state.getIn(['products', 'totalPages']),
  error: state.getIn(['products', 'error']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: currentPage => dispatch(fetchProducts(currentPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage)
