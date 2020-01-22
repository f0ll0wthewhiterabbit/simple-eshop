import { connect } from 'react-redux'

import SidebarNav from './component'
import { closeSidebar } from '../../../../../store/actions'

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(null, mapDispatchToProps)(SidebarNav)
