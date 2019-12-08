import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  error: state.products.error,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
