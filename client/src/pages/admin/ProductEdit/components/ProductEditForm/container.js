import { connect } from 'react-redux'

import ProductEditForm from './component'
import { editProductRequest } from '../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = {
  editProductRequest: (id, changedFieldsFormData, history, setFormSubmitting) =>
    editProductRequest(id, changedFieldsFormData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm)
