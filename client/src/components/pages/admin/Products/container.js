import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['products', 'itemsPerPage']),
  isLoading: state.getIn(['products', 'isLoading']),
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  fetchProducts: (page, itemsPerPage) => fetchProducts(page, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
