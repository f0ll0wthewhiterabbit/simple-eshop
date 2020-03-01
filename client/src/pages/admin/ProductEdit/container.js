import { connect } from 'react-redux'

import ProductEditPage from './component'
import { fetchProductRequest } from '../../../store/actions'

const mapStateToProps = state => ({
  product: state.getIn(['products', 'currentProduct']),
  isLoading: state.getIn(['products', 'isLoading']),
})

const mapDispatchToProps = {
  fetchProductRequest: id => fetchProductRequest(id),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditPage)
