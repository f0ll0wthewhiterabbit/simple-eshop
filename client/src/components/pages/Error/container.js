import { connect } from 'react-redux'

import ErrorPage from './component'
import { ROLE_ADMIN } from '../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLE_ADMIN,
})

export default connect(mapStateToProps)(ErrorPage)
