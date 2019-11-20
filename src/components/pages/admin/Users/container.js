import { connect } from 'react-redux'

import UsersPage from './component'
import { fetchUsers } from '../../../../store/actions'

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
  isErrorInLoad: state.users.isErrorInLoad,
  storageSetupError: state.app.storageSetupError,
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)
