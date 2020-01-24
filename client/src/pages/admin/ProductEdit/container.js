import { connect } from 'react-redux'

import ProductEditPage from './component'
import { fetchProduct } from '../../../store/actions'

const mapStateToProps = state => ({
  product: state.getIn(['products', 'currentProduct']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = {
  fetchProduct: id => fetchProduct(id),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditPage)
