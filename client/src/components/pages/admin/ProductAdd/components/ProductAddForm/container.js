import { connect } from 'react-redux'

import ProductAddForm from './component'
import { addProduct } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  addProduct: (productFormData, history, setFormSubmitting) =>
    addProduct(productFormData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm)
