import { connect } from 'react-redux'

import UsersTable from './component'
import { setSelectedUsers } from '../../../store/actions'

const mapStateToProps = state => ({
  usersList: state.users.data,
  selectedUsers: state.users.selected,
})

const mapDispatchToProps = dispatch => ({
  setSelectedUsers: selectedUsersList => dispatch(setSelectedUsers(selectedUsersList)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable)
