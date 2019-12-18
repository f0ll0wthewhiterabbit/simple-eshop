import { connect } from 'react-redux'

import UserLayout from './component'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  userRole: state.getIn(['auth', 'user', 'role']),
})

export default connect(mapStateToProps)(UserLayout)
