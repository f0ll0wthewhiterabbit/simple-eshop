import { connect } from 'react-redux'

import ProfileForm from './component'
import { updateUser } from '../../../../../store/actions'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userData, history, setFormSubmitting) =>
    dispatch(updateUser(userData, history, setFormSubmitting)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
