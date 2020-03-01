import { connect } from 'react-redux'

import App from './component'
import { initializeRequest } from '../../../store/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = {
  initializeRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
