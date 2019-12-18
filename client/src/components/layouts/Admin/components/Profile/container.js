import { connect } from 'react-redux'

import Profile from './component'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
})

export default connect(mapStateToProps)(Profile)
