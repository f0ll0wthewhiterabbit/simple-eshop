import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProductsRequest } from '../../store/actions'

const mapStateToProps = state => ({
  products: state.getIn(['products', 'data']),
  currentPage: state.getIn(['products', 'currentPage']),
  totalPages: state.getIn(['products', 'totalPages']),
  filter: state.getIn(['products', 'filter']),
  error: state.getIn(['products', 'error']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, itemsPerPage, filter) =>
    fetchProductsRequest(page, itemsPerPage, filter),
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage)
