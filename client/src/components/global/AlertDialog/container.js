import { connect } from 'react-redux'

import AlertDialog from './component'
import { closeModal } from '../../../store/actions'

const mapStateToProps = state => ({
  isModalOpened: state.getIn(['app', 'isModalOpened']),
})

const mapDispatchToProps = {
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)
