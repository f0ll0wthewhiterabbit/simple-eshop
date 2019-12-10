import { connect } from 'react-redux'

import AlertDialog from './component'
import { closeModal, deleteUsers, deleteProducts, requestUserDeletion } from '../../../store/actions'

const mapStateToProps = state => ({
  isModalOpened: state.app.modal.isOpened,
  storeFieldName: state.app.modal.storeFieldName,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteUsers: () => dispatch(deleteUsers()),
  deleteProducts: () => dispatch(deleteProducts()),
  requestUserDeletion: () => dispatch(requestUserDeletion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)
