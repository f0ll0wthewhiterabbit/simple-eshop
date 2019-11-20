import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../../global/ErrorMessage'
import Loader from '../../../global/Loader'
import UsersTable from '../../../tables/Users'

const UsersPage = ({ isLoading, isErrorInLoad, storageSetupError, fetchUsers }) => {
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (isErrorInLoad) {
    return <ErrorMessage>Error in fetching users!</ErrorMessage>
  }

  if (storageSetupError) {
    return <ErrorMessage>Database setup error!</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  return <UsersTable />
}

UsersPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isErrorInLoad: PropTypes.bool.isRequired,
  storageSetupError: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

export default UsersPage
