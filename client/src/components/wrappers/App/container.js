import { connect } from 'react-redux'

import App from './component'
import { initialize } from '../../../store/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = {
  initialize,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
