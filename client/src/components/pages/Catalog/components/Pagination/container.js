import { connect } from 'react-redux'

import Pagination from './component'
import { fetchProducts } from '../../../../../store/actions'

const mapStateToProps = state => ({
  currentPage: state.getIn(['products', 'currentPage']),
  totalPages: state.getIn(['products', 'totalPages']),
  filter: state.getIn(['products', 'filter']),
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (currentPage, itemsPerPage, filter) =>
    dispatch(fetchProducts(currentPage, itemsPerPage, filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)
