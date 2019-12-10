import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../../global/ErrorMessage'
import Loader from '../../../global/Loader'
import UsersTable from './components/UsersTable'

const UsersPage = ({ isLoading, error, fetchUsers }) => {
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (isLoading) {
    return <Loader />
  }

  return <UsersTable />
}

UsersPage.defaultProps = {
  error: null,
}

UsersPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchUsers: PropTypes.func.isRequired,
}

export default UsersPage
