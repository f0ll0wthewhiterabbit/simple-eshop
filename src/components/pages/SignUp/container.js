import { connect } from 'react-redux'

import SignUpPage from './component'

const mapStateToProps = state => ({
  isUserAdded: state.users.current.id !== null,
  userRole: state.users.current.role,
})

export default connect(mapStateToProps)(SignUpPage)
