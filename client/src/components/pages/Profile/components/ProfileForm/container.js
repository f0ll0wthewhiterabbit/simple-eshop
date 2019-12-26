import { connect } from 'react-redux'

import ProfileForm from './component'
import { updateUser } from '../../../../../store/actions'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = dispatch => ({
  updateUser: (userData, history) => dispatch(updateUser(userData, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
