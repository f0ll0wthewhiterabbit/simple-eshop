import { connect } from 'react-redux'

import UsersTable from './component'
import { setSelectedUsers, fetchUsersRequest, setUsersPerPage } from '../../../../../store/actions'

const mapStateToProps = state => ({
  usersList: state.getIn(['users', 'data']),
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  currentPage: state.getIn(['users', 'currentPage']),
  totalAmount: state.getIn(['users', 'totalAmount']),
  selectedUsers: state.getIn(['users', 'selected']),
  lastSearchQuery: state.getIn(['users', 'lastSearchQuery']),
})

const mapDispatchToProps = {
  setSelectedUsers: selectedUsersList => setSelectedUsers(selectedUsersList),
  fetchUsersRequest: (currentPage, itemsPerPage) => fetchUsersRequest(currentPage, itemsPerPage),
  setUsersPerPage: amount => setUsersPerPage(amount),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
