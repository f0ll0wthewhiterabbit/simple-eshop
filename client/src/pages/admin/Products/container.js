import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProductsRequest, setProductsSearchQuery } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, queryParams) => fetchProductsRequest(page, queryParams),
  setProductsSearchQuery: searchQuery => setProductsSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
