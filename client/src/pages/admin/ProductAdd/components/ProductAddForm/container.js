import { connect } from 'react-redux'

import ProductAddForm from './component'
import { addProductRequest } from '../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  addProductRequest: (productFormData, history, setFormSubmitting) =>
    addProductRequest(productFormData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddForm)
