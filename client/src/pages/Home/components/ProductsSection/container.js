import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProductsRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  products: state.getIn(['products', 'data']),
  error: state.getIn(['products', 'error']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, itemsPerPage) => fetchProductsRequest(page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage)
