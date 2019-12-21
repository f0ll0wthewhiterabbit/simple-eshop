import { connect } from 'react-redux'

import Layout from './component'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  userRole: state.getIn(['auth', 'user', 'role']),
})

export default connect(mapStateToProps)(Layout)
