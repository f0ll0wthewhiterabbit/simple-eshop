import { connect } from 'react-redux'

import ProductsToolbar from './component'
import { fetchProducts, setProductsSearchQuery } from '../../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  lastSearchQuery: state.getIn(['products', 'lastSearchQuery']),
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage, searchText) => fetchProducts(page, itemsPerPage, searchText),
  setProductsSearchQuery: searchQuery => setProductsSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsToolbar)
