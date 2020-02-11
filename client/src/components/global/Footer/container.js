import { connect } from 'react-redux'

import Footer from './component'
import { ROLE_ADMIN } from '../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLE_ADMIN,
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
})

export default connect(mapStateToProps)(Footer)
