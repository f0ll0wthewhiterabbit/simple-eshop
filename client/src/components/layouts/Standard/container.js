import { connect } from 'react-redux'

import StandardLayout from './component'
import { requestUserDeletion } from '../../../store/actions'

const mapDispatchToProps = {
  requestUserDeletion,
}

export default connect(null, mapDispatchToProps)(StandardLayout)
