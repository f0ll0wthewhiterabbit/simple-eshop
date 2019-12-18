import { connect } from 'react-redux'

import UserMenu from './component'
import { showModal, signOut } from '../../../../../store/actions'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../../../constants'

const mapStateToProps = state => ({
  userName: state.getIn(['auth', 'user', 'firstName']),
  isAdmin: state.getIn(['auth', 'user', 'role']) === DATABASE_FIELD_ROLE_ADMIN,
  isDeleteRequestSent: state.getIn(['auth', 'user', 'isRemovable']),
})

const mapDispatchToProps = dispatch => ({
  showModal: storeFieldNameForModal => dispatch(showModal(storeFieldNameForModal)),
  signOut: (history, location) => dispatch(signOut(history, location)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
