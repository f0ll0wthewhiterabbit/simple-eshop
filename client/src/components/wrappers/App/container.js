import { connect } from 'react-redux'

import App from './component'
import { authenticate } from '../../../store/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = {
  authenticate,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
