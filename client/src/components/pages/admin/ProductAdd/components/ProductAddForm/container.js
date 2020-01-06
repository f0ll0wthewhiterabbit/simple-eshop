import { connect } from 'react-redux'

import ProductAddForm from './component'
import { addProduct } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = dispatch => ({
  addProduct: (productFormData, history) => dispatch(addProduct(productFormData, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm)
