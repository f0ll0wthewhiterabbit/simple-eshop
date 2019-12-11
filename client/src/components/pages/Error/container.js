import { connect } from 'react-redux'

import ErrorPage from './component'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.auth.user.role === DATABASE_FIELD_ROLE_ADMIN,
})

export default connect(mapStateToProps)(ErrorPage)
