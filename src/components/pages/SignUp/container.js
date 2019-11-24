import { connect } from 'react-redux'

import SignUpPage from './component'
import { signOut } from '../../../store/actions'

const mapStateToProps = state => ({
  isUserAdded: state.users.current.id !== null,
  userRole: state.users.current.role,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage)
