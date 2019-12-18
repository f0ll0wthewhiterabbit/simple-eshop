import { connect } from 'react-redux'

import UsersTable from './component'
import { setSelectedUsers } from '../../../../../../store/actions'

const mapStateToProps = state => ({
  usersList: state.getIn(['users', 'data']),
  selectedUsers: state.getIn(['users', 'selected']),
})

const mapDispatchToProps = dispatch => ({
  setSelectedUsers: selectedUsersList => dispatch(setSelectedUsers(selectedUsersList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
