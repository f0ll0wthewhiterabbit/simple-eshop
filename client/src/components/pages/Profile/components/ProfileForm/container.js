import { connect } from 'react-redux'

import ProfileForm from './component'
import { updateUser } from '../../../../../store/actions'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = {
  updateUser: (userData, history, setFormSubmitting) =>
    updateUser(userData, history, setFormSubmitting),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
