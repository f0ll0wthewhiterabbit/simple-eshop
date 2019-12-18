import { connect } from 'react-redux'

import UsersPage from './component'
import { fetchUsers } from '../../../../store/actions'

const mapStateToProps = state => ({
  isLoading: state.getIn(['app', 'isLoading']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
