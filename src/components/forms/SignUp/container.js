import { connect } from 'react-redux'

import SignUpForm from './component'
import { addUser } from '../../../store/actions'

const mapStateToProps = state => ({
  isUserAdded: state.users.current.id !== null,
  error: state.users.error,
})

const mapDispatchToProps = dispatch => ({
  addUser: userData => dispatch(addUser(userData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
