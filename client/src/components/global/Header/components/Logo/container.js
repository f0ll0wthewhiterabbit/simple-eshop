import { connect } from 'react-redux'

import Logo from './component'
import { ROLE_ADMIN, FIELD_THEME_DARK } from '../../../../../constants'

const mapStateToProps = state => ({
  isAdmin: state.getIn(['auth', 'user', 'role']) === ROLE_ADMIN,
  isDarkTheme: state.getIn(['app', 'theme']) === FIELD_THEME_DARK,
})

export default connect(mapStateToProps)(Logo)
