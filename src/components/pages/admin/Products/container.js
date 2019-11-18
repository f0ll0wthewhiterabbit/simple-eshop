import { connect } from 'react-redux'

import ProductsPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  productsList: state.products.data,
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
