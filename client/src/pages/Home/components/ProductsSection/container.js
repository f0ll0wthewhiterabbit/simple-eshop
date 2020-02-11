import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  products: state.getIn(['products', 'data']),
  error: state.getIn(['products', 'error']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = {
  fetchProducts: page => fetchProducts(page),
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage)
