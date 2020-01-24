import { connect } from 'react-redux'

import UsersPage from './component'
import { fetchUsers } from '../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  isLoading: state.getIn(['users', 'isLoading']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = {
  fetchUsers: (currentPage, itemsPerPage) => fetchUsers(currentPage, itemsPerPage),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
