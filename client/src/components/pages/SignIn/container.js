import { connect } from 'react-redux'

import SignInPage from './component'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userRole: state.auth.user.role,
})

export default connect(mapStateToProps)(SignInPage)
