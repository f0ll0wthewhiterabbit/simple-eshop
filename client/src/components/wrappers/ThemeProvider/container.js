import { connect } from 'react-redux'

import ThemeProviderWrapper from './component'
import { FIELDS } from '../../../constants'

const mapStateToProps = state => ({
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

export default connect(mapStateToProps)(ThemeProviderWrapper)
