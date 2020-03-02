import { connect } from 'react-redux'

import Pagination from './component'
import { fetchProductsRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  currentPage: state.getIn(['products', 'currentPage']),
  totalPages: state.getIn(['products', 'totalPages']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  filter: state.getIn(['products', 'filter']),
})

const mapDispatchToProps = {
  fetchProductsRequest: (page, queryParams) => fetchProductsRequest(page, queryParams),
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
