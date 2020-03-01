import { connect } from 'react-redux'

import ProfileForm from './component'
import { updateUserRequest } from '../../../../store/actions'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = {
  updateUserRequest: (userData, history, setFormSubmitting) =>
    updateUserRequest(userData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
