import { connect } from 'react-redux'

import Root from './component'
import { fetchDatabaseToStorage } from '../../../store/actions'

const mapStateToProps = state => ({
  isStorageDataReady: state.app.isStorageDataReady,
  error: state.app.error,
})

const mapDispatchToProps = dispatch => ({
  fetchDatabaseToStorage: () => dispatch(fetchDatabaseToStorage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)