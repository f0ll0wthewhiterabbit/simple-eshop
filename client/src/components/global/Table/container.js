import { connect } from 'react-redux'

import Table from './component'
import { showModal } from '../../../store/actions'
import { FIELDS } from '../../../constants'

const mapStateToProps = state => ({
  isDarkTheme: state.getIn(['app', 'theme']) === FIELDS.THEME_DARK,
})

const mapDispatchToProps = {
  showModal: storeFieldNameForModal => showModal(storeFieldNameForModal),
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
