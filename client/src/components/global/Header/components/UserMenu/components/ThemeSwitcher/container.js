import { connect } from 'react-redux'

import ThemeSwitcher from './component'
import { toggleTheme } from '../../../../../../../store/actions'
import { FIELDS } from '../../../../../../../constants'

const mapStateToProps = state => ({
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

const mapDispatchToProps = {
  toggleTheme: theme => toggleTheme(theme),
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher)
