import { connect } from 'react-redux'

import Table from './component'
import { showModal } from '../../../store/actions'
import { FIELD_THEME_DARK } from '../../../constants'

const mapStateToProps = state => ({
  isDarkTheme: state.getIn(['app', 'theme']) === FIELD_THEME_DARK,
})

const mapDispatchToProps = {
  showModal: storeFieldNameForModal => showModal(storeFieldNameForModal),
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
