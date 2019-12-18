import { connect } from 'react-redux'

import Logo from './component'
import { DATABASE_FIELD_ROLE_ADMIN } from '../../../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === DATABASE_FIELD_ROLE_ADMIN,
})

export default connect(mapStateToProps)(Logo)
