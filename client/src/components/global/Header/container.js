import { connect } from 'react-redux'

import Header from './component'
import { openSidebar } from '../../../store/actions'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../constants'

const mapStateToProps = state => ({
  isAdminMode: state.users.current.role === DATABASE_FIELD_ROLE_ADMIN,
  isUserSignedUp: state.users.current.id !== null,
})

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(openSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
