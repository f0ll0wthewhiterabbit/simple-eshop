import { connect } from 'react-redux'

import UserMenuComponent from './component'
import { showModal, signOut } from '../../../../../store/actions'
import { ROLES } from '../../../../../constants'

const mapStateToProps = state => ({
  userName: state.getIn(['auth', 'user', 'firstName']),
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLES.ADMIN,
  isDeleteRequestSent: state.getIn(['auth', 'user', 'isRemovable']),
})

const mapDispatchToProps = {
  showModal: storeFieldNameForModal => showModal(storeFieldNameForModal),
  signOut: (history, location) => signOut(history, location),
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuComponent)
