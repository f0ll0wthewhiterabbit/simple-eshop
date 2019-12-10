import { connect } from 'react-redux'

import Profile from './component'

const mapStateToProps = state => ({
  firstName: state.auth.user.firstName,
  lastName: state.auth.user.lastName,
})

export default connect(mapStateToProps)(Profile)
