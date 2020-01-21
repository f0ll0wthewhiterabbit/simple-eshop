import { connect } from 'react-redux'

import AdminLayoutWithTheme from './component'
import { closeSidebar, deleteUsers, deleteProducts } from '../../../store/actions'

const mapStateToProps = state => ({
  isSidebarOpened: state.getIn(['app', 'isSidebarOpened']),
  storeFieldName: state.getIn(['app', 'storeFieldNameForModal']),
})

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
  deleteUsers: () => dispatch(deleteUsers()),
  deleteProducts: () => dispatch(deleteProducts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayoutWithTheme)
