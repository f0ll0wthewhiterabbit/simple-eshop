import { connect } from 'react-redux'

import AdminLayoutWithTheme from './component'
import { closeSidebar, deleteUsersRequest, deleteProductsRequest } from '../../../store/actions'

const mapStateToProps = state => ({
  isSidebarOpened: state.getIn(['app', 'isSidebarOpened']),
  storeFieldName: state.getIn(['app', 'storeFieldNameForModal']),
})

const mapDispatchToProps = {
  closeSidebar,
  deleteUsersRequest,
  deleteProductsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayoutWithTheme)
