import { connect } from 'react-redux'

import Header from './component'
import { openSidebar } from '../../../store/actions'
import { ROLES } from '../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLES.ADMIN,
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isDeleteRequestSent: state.getIn(['auth', 'user', 'isRemovable']),
})

const mapDispatchToProps = {
  openSidebar,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
