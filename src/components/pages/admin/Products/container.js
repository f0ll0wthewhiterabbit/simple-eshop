import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  isErrorInLoad: state.products.isErrorInLoad,
  storageSetupError: state.app.storageSetupError,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage)
