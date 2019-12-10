import { connect } from 'react-redux'

import AdminLayout from './component'
import { closeSidebar } from '../../../store/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.user.role,
  isSidebarOpened: state.app.isSidebarOpened,
})

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
