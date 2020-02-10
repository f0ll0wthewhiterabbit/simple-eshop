import { connect } from 'react-redux'

import Pagination from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  currentPage: state.getIn(['products', 'currentPage']),
  totalPages: state.getIn(['products', 'totalPages']),
  totalAmount: state.getIn(['products', 'totalAmount']),
  filter: state.getIn(['products', 'filter']),
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage, filter) => fetchProducts(page, itemsPerPage, filter),
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
