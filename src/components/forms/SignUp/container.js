import { connect } from 'react-redux'

import SignUpForm from './component'
import { signUp } from '../../../store/actions'

const mapStateToProps = state => ({
  error: state.users.error,
})

const mapDispatchToProps = dispatch => ({
  signUp: userData => dispatch(signUp(userData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
