import { connect } from 'react-redux'

import App from './component'
import { authenticate } from '../../../store/actions'

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  error: state.getIn(['auth', 'error']),
})

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
