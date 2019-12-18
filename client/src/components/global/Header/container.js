import { connect } from 'react-redux'

import Header from './component'
import { openSidebar } from '../../../store/actions'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === DATABASE_FIELD_ROLE_ADMIN,
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isDeleteRequestSent: state.getIn(['auth', 'user', 'isRemovable']),
})

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(openSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
