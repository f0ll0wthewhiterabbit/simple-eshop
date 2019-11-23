import { connect } from 'react-redux'

import SignUpForm from './component'
import { signInUser, deleteUserDataFromStorage } from '../../../store/actions'

const mapStateToProps = state => ({
  isUserSignedUp: state.users.current.id !== null,
  error: state.users.error,
})

const mapDispatchToProps = dispatch => ({
  signInUser: userData => dispatch(signInUser(userData)),
  deleteUserDataFromStorage: () => dispatch(deleteUserDataFromStorage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
