import { connect } from 'react-redux'

import UsersToolbar from './component'
import { fetchUsersRequest, setUsersSearchQuery } from '../../../../../store/actions'

const mapStateToProps = state => ({
  itemsPerPage: state.getIn(['users', 'itemsPerPage']),
  lastSearchQuery: state.getIn(['users', 'lastSearchQuery']),
})

const mapDispatchToProps = {
  fetchUsersRequest: (currentPage, queryParams) => fetchUsersRequest(currentPage, queryParams),
  setUsersSearchQuery: searchQuery => setUsersSearchQuery(searchQuery),
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersToolbar)
