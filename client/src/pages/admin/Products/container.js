import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts, setProductsSearchQuery } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage) => fetchProducts(page, itemsPerPage),
  setProductsSearchQuery: searchQuery => setProductsSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
