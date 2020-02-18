import { connect } from 'react-redux'

import ThemeProviderWrapper from './component'
import { FIELD_THEME_DARK } from '../../../constants'

const mapStateToProps = state => ({
  isDarkTheme: state.getIn(['app', 'theme']) === FIELD_THEME_DARK,
})

export default connect(mapStateToProps)(ThemeProviderWrapper)
