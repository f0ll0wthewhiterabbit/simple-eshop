import { connect } from 'react-redux'

import SignInPage from './component'

const mapStateToProps = state => ({
  isUserSignedUp: state.users.current.id !== null,
  userRole: state.users.current.role,
})

export default connect(mapStateToProps)(SignInPage)
