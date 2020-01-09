import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Table from '../../../../../global/Table'
import { STORE_FIELD_USERS } from '../../../../../../constants'

const UsersTable = ({
  usersList,
  itemsPerPage,
  currentPage,
  totalAmount,
  selectedUsers,
  setSelectedUsers,
  fetchUsers,
  setUsersPerPage,
}) => {
  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
  ]

  return (
    <Table
      rows={usersList}
      rowsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalAmount={totalAmount}
      headCells={headCells}
      title="Users"
      storeFieldName={STORE_FIELD_USERS}
      selectedItems={selectedUsers}
      setSelectedItems={setSelectedUsers}
      fetchData={fetchUsers}
      setRowsPerPage={setUsersPerPage}
    />
  )
}

UsersTable.propTypes = {
  usersList: ImmutablePropTypes.listOf(
    ImmutablePropTypes.recordOf({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isRemovable: PropTypes.bool.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  selectedUsers: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  setUsersPerPage: PropTypes.func.isRequired,
}

export default UsersTable
