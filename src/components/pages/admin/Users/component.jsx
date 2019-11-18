import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Table from '../../../global/Table'
import ErrorMessage from '../../../global/ErrorMessage'
import Loader from '../../../global/Loader'

const UsersPage = ({ usersList, isErrorInLoad, storageSetupError, fetchUsers }) => {
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (isErrorInLoad) {
    return <ErrorMessage>Error in fetching users!</ErrorMessage>
  }

  if (storageSetupError) {
    return <ErrorMessage>Database setup error!</ErrorMessage>
  }

  if (usersList.length === 0) {
    return <Loader />
  }

  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
  ]

  return <Table rows={usersList} headCells={headCells} title="Users" />
}

UsersPage.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isErrorInLoad: PropTypes.bool.isRequired,
  storageSetupError: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
}

export default UsersPage
