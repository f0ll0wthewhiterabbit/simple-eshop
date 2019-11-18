import { connect } from 'react-redux'

import UserMenu from './component'
import { showModal } from '../../../../../store/actions'

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal()),
})

export default connect(
  null,
  mapDispatchToProps
)(UserMenu)
