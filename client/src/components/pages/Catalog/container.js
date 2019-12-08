import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProducts } from '../../../store/actions'

const mapStateToProps = state => ({
  products: state.products.data,
  error: state.products.error,
  isLoading: state.app.isLoading,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage)
