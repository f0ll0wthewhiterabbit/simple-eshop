import { connect } from 'react-redux'

import UserLayout from './component'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.user.role,
})

export default connect(mapStateToProps)(UserLayout)
