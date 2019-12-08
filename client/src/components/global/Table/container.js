import { connect } from 'react-redux'

import Table from './component'
import { showModal } from '../../../store/actions'

const mapDispatchToProps = dispatch => ({
  showModal: storeFieldNameForModal => dispatch(showModal(storeFieldNameForModal)),
})

export default connect(null, mapDispatchToProps)(Table)
