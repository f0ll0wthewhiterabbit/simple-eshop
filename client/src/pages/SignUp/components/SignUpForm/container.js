import { connect } from 'react-redux'

import SignUpForm from './component'
import { signUpRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = {
  signUpRequest: (userData, setFormSubmitting) => signUpRequest(userData, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
