import { connect } from 'react-redux'

import SignInForm from './component'
import { signInUser } from '../../../store/actions'

const mapStateToProps = state => ({
  isUserSignedUp: state.users.current.id !== null,
  error: state.users.error,
})

const mapDispatchToProps = dispatch => ({
  signInUser: userData => dispatch(signInUser(userData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm)
