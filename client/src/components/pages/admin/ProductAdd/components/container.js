import { connect } from 'react-redux'

import ProductAddForm from './component'
import { addProduct } from '../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.products.error,
})

const mapDispatchToProps = dispatch => ({
  addProduct: (productData, history) => dispatch(addProduct(productData, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm)
