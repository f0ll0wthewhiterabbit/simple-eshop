import { connect } from 'react-redux'

import AlertDialog from './component'
import { closeModal, deleteSelectedItems } from '../../../store/actions'

const mapStateToProps = state => ({
  isModalOpened: state.app.modal.isOpened,
  storeFieldName: state.app.modal.storeFieldName,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteSelectedItems: storeFieldName => dispatch(deleteSelectedItems(storeFieldName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertDialog)
