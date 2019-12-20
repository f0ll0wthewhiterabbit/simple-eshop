import { connect } from 'react-redux'

import AlertDialog from './component'
import {
  closeModal,
  deleteUsers,
  deleteProducts,
  requestUserDeletion,
} from '../../../store/actions'

const mapStateToProps = state => ({
  isModalOpened: state.getIn(['app', 'isModalOpened']),
  storeFieldName: state.getIn(['app', 'storeFieldNameForModal']),
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  deleteUsers: () => dispatch(deleteUsers()),
  deleteProducts: () => dispatch(deleteProducts()),
  requestUserDeletion: () => dispatch(requestUserDeletion()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)
