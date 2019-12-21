import { connect } from 'react-redux'

import AdminLayout from './component'
import { closeSidebar } from '../../../store/actions'

const mapStateToProps = state => ({
  isSidebarOpened: state.getIn(['app', 'isSidebarOpened']),
})

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
