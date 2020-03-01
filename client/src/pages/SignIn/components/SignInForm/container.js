import { connect } from 'react-redux'

import SignInForm from './component'
import { signInRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = {
  signInRequest: (userData, setFormSubmitting) => signInRequest(userData, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
