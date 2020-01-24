import { connect } from 'react-redux'

import ProductEditForm from './component'
import { editProduct } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  editProduct: (id, changedFieldsFormData, history, setFormSubmitting) =>
    editProduct(id, changedFieldsFormData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm)
