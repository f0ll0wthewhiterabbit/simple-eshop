import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../../components/global/ErrorMessage'
import Loader from '../../../components/global/Loader'
import UsersTableContainer from './components/UsersTable'
import UsersToolbarContainer from './components/UsersToolbar'

const UsersPage = ({ itemsPerPage, isLoading, error, fetchUsers, setUsersSearchQuery }) => {
  useEffect(() => {
    setUsersSearchQuery('')
  }, [setUsersSearchQuery])

  useEffect(() => {
    fetchUsers(1, itemsPerPage)
  }, [fetchUsers, itemsPerPage])

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <UsersToolbarContainer />
      <UsersTableContainer />
    </>
  )
}

UsersPage.defaultProps = {
  error: null,
}

UsersPage.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchUsers: PropTypes.func.isRequired,
  setUsersSearchQuery: PropTypes.func.isRequired,
}

export default UsersPage
