import { connect } from 'react-redux'

import ProfilePage from './component'

const mapStateToProps = state => ({
  firstName: state.getIn(['auth', 'user', 'firstName']),
  lastName: state.getIn(['auth', 'user', 'lastName']),
})

export default connect(mapStateToProps)(ProfilePage)
