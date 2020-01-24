import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ErrorMessage from '../../../components/global/ErrorMessage'
import Loader from '../../../components/global/Loader'
import UsersTable from './components/UsersTable'

const UsersPage = ({ itemsPerPage, isLoading, error, fetchUsers }) => {
  useEffect(() => {
    fetchUsers(1, itemsPerPage)
  }, [fetchUsers, itemsPerPage])

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
  itemsPerPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  fetchUsers: PropTypes.func.isRequired,
}

export default UsersPage
