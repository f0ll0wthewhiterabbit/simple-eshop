import { connect } from 'react-redux'

import Profile from './component'

const mapStateToProps = state => ({
  firstName: state.users.current.firstName,
  lastName: state.users.current.lastName,
})

export default connect(mapStateToProps)(Profile)
