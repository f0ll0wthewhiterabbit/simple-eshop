import { connect } from 'react-redux'

import UsersPage from './component'
import { fetchUsersRequest, setUsersSearchQuery } from '../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  isLoading: state.getIn(['users', 'isLoading']),
  error: state.getIn(['users', 'error']),
})

const mapDispatchToProps = {
  fetchUsersRequest: (currentPage, itemsPerPage) => fetchUsersRequest(currentPage, itemsPerPage),
  setUsersSearchQuery: searchQuery => setUsersSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
