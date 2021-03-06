import React from 'react'
import PropTypes from 'prop-types'

import SearchForm from '../../../../../components/global/SearchForm'
import Wrapper from './styles'

const UsersToolbar = ({
  itemsPerPage,
  lastSearchQuery,
  fetchUsersRequest,
  setUsersSearchQuery,
}) => {
  return (
    <Wrapper>
      <SearchForm
        placeholder="Search users"
        itemsPerPage={itemsPerPage}
        searchMethod={fetchUsersRequest}
        setSearchQueryMethod={setUsersSearchQuery}
        initialValue={lastSearchQuery}
      />
    </Wrapper>
  )
}

UsersToolbar.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  lastSearchQuery: PropTypes.string.isRequired,
  fetchUsersRequest: PropTypes.func.isRequired,
  setUsersSearchQuery: PropTypes.func.isRequired,
}

export default UsersToolbar
