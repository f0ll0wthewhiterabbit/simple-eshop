import { connect } from 'react-redux'

import UserLayout from './component'

const mapStateToProps = state => ({
  isUserSignedUp: state.users.current.id !== null,
  userRole: state.users.current.role,
})

export default connect(mapStateToProps)(UserLayout)
