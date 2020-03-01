import { connect } from 'react-redux'

import StandardLayout from './component'
import { callForUserDeletionRequest } from '../../../store/actions'

const mapDispatchToProps = {
  callForUserDeletionRequest,
}

export default connect(null, mapDispatchToProps)(StandardLayout)
