import { connect } from 'react-redux'

import UsersPage from './component'
import { fetchUsers, setUsersSearchQuery } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  isLoading: state.getIn(['users', 'isLoading']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = {
  fetchUsers: (currentPage, itemsPerPage) => fetchUsers(currentPage, itemsPerPage),
  setUsersSearchQuery: searchQuery => setUsersSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
