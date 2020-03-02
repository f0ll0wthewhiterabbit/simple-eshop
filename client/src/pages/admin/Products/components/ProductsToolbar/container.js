import { connect } from 'react-redux'

import ProductsToolbar from './component'
import { fetchProductsRequest, setProductsSearchQuery } from '../../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  lastSearchQuery: state.getIn(['products', 'lastSearchQuery']),
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, queryParams) => fetchProductsRequest(page, queryParams),
  setProductsSearchQuery: searchQuery => setProductsSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar)
