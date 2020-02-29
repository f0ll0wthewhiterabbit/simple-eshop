import { connect } from 'react-redux'

import Logo from './component'
import { ROLES, FIELDS } from '../../../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLES.ADMIN,
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

export default connect(mapStateToProps)(Logo)
