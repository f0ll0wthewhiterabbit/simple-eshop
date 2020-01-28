import { connect } from 'react-redux'

import SidebarNav from './component'
import { closeSidebar } from '../../../../../store/actions'

const mapStateToProps = state => ({
  isSidebarOpened: state.getIn(['app', 'isSidebarOpened']),
})

const mapDispatchToProps = {
  closeSidebar,
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav)
