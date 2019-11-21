import { connect } from 'react-redux'

import UserMenu from './component'
import { showModal } from '../../../../../store/actions'

const mapDispatchToProps = dispatch => ({
  showModal: storeFieldNameForModal => dispatch(showModal(storeFieldNameForModal)),
})

export default connect(
  null,
  mapDispatchToProps
)(UserMenu)
