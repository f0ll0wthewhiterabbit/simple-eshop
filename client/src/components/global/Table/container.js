import { connect } from 'react-redux'

import Table from './component'
import { showModal } from '../../../store/actions'

const mapDispatchToProps = {
  showModal: storeFieldNameForModal => showModal(storeFieldNameForModal),
}

export default connect(null, mapDispatchToProps)(Table)
