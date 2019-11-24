import { connect } from 'react-redux'

import AdminLayout from './component'
import { closeSidebar } from '../../../store/actions'

const mapStateToProps = state => ({
  isUserSignedUp: state.users.current.id !== null,
  userRole: state.users.current.role,
  isSidebarOpened: state.app.isSidebarOpened,
})

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLayout)
