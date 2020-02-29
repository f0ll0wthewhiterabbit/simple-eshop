import { connect } from 'react-redux'

import ErrorPage from './component'
import { ROLES } from '../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLES.ADMIN,
})

export default connect(mapStateToProps)(ErrorPage)
