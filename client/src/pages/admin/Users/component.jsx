import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../../components/global/ErrorMessage'
import Loader from '../../../components/global/Loader'
import UsersTableContainer from './components/UsersTable'
import UsersToolbarContainer from './components/UsersToolbar'

const UsersPage = ({ itemsPerPage, isLoading, error, fetchUsersRequest, setUsersSearchQuery }) => {
  useEffect(() => {
    setUsersSearchQuery('')
  }, [setUsersSearchQuery])

  useEffect(() => {
    fetchUsersRequest(1, { itemsPerPage })
  }, [fetchUsersRequest, itemsPerPage])

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

UsersPage.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchUsersRequest: PropTypes.func.isRequired,
  setUsersSearchQuery: PropTypes.func.isRequired,
}

export default UsersPage
