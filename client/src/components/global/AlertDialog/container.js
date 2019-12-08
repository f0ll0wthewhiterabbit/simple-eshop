import { connect } from 'react-redux'

import AlertDialog from './component'
import { closeModal, deleteItems } from '../../../store/actions'

const mapStateToProps = state => ({
  isModalOpened: state.app.modal.isOpened,
  storeFieldName: state.app.modal.storeFieldName,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteItems: storeFieldName => dispatch(deleteItems(storeFieldName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)
