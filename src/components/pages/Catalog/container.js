import { connect } from 'react-redux'

import CatalogPage from './component'
import { fetchProducts } from '../../../store/actions'

const mapStateToProps = state => ({
  products: state.products.data,
  isErrorInLoad: state.products.isErrorInLoad,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogPage)
