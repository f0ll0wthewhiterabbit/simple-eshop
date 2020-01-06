import { connect } from 'react-redux'

import ProductEditForm from './component'
import { editProduct } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['products', 'error']),
})

const mapDispatchToProps = dispatch => ({
  editProduct: (id, changedFieldsFormData, history) =>
    dispatch(editProduct(id, changedFieldsFormData, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm)
