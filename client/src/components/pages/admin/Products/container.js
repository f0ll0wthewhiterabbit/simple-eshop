import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (currentPage, itemsPerPage) => dispatch(fetchProducts(currentPage, itemsPerPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
