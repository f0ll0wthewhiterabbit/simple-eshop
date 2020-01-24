import { connect } from 'react-redux'

import SidebarNav from './component'
import { closeSidebar } from '../../../../../store/actions'

const mapDispatchToProps = {
  closeSidebar,
}

export default connect(null, mapDispatchToProps)(SidebarNav)
