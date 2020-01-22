import { connect } from 'react-redux'

import SignUpForm from './component'
import { signUp } from '../../../../../store/actions'

const mapStateToProps = state => ({
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = dispatch => ({
  signUp: (userData, setFormSubmitting) => dispatch(signUp(userData, setFormSubmitting)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
