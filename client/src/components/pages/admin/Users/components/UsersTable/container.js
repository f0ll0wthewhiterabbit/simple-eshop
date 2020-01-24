import { connect } from 'react-redux'

import UsersTable from './component'
import { setSelectedUsers, fetchUsers, setUsersPerPage } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  usersList: state.getIn(['users', 'data']),
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  currentPage: state.getIn(['users', 'currentPage']),
  totalAmount: state.getIn(['users', 'totalAmount']),
  selectedUsers: state.getIn(['users', 'selected']),
})

const mapDispatchToProps = {
  setSelectedUsers: selectedUsersList => setSelectedUsers(selectedUsersList),
  fetchUsers: (currentPage, itemsPerPage) => fetchUsers(currentPage, itemsPerPage),
  setUsersPerPage: amount => setUsersPerPage(amount),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
