import { connect } from 'react-redux'

import Root from './component'
import { initialize } from '../../../store/actions'

const mapStateToProps = state => ({
  isStorageDataReady: state.app.isStorageDataReady,
  error: state.app.error,
})

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)
