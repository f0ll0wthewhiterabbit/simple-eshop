import { connect } from 'react-redux'

import SignInForm from './component'
import { signIn } from '../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = dispatch => ({
  signIn: (userData, setFormSubmitting) => dispatch(signIn(userData, setFormSubmitting)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
