import { connect } from 'react-redux'

import UserMenu from './component'
import { showModal, signOut } from '../../../../../store/actions'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../../../constants'

const mapStateToProps = state => ({
  userName: state.users.current.firstName,
  isAdminMode: state.users.current.role === DATABASE_FIELD_ROLE_ADMIN,
  isDeleteRequestSent: state.users.current.isRemovable,
})

const mapDispatchToProps = dispatch => ({
  showModal: storeFieldNameForModal => dispatch(showModal(storeFieldNameForModal)),
  signOut: () => dispatch(signOut()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu)
