import { connect } from 'react-redux'

import ProductEditPage from './component'
import { fetchProducts } from '../../../../store/actions'

const mapStateToProps = state => ({
  isLoading: state.getIn(['products', 'isLoading']),
  products: state.getIn(['products', 'data']),
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditPage)
