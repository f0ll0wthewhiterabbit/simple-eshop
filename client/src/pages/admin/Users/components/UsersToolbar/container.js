import { connect } from 'react-redux'

import UsersToolbar from './component'
import { fetchUsers, setUsersSearchQuery } from '../../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
})

const mapDispatchToProps = {
  fetchUsers: (currentPage, itemsPerPage, searchText) =>
    fetchUsers(currentPage, itemsPerPage, searchText),
  setUsersSearchQuery: searchQuery => setUsersSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersToolbar)
