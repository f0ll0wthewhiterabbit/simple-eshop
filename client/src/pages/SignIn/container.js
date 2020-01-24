import { connect } from 'react-redux'

import SignInPage from './component'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  userRole: state.getIn(['auth', 'user', 'role']),
})

export default connect(mapStateToProps)(SignInPage)
