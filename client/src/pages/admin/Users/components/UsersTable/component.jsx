import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import TableContainer from '../../../../../components/global/Table'
import { FIELDS } from '../../../../../constants'

const UsersTable = ({
  usersList,
  itemsPerPage,
  currentPage,
  totalAmount,
  selectedUsers,
  lastSearchQuery,
  setSelectedUsers,
  fetchUsers,
  setUsersPerPage,
}) => {
  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
  ]
  const titleAddition = lastSearchQuery !== '' ? ` - result for "${lastSearchQuery}"` : ''
  const title = `Users${titleAddition}`

  return (
    <TableContainer
      rows={usersList}
      rowsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalAmount={totalAmount}
      headCells={headCells}
      title={title}
      storeFieldName={FIELDS.STORE_USERS}
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
  lastSearchQuery: PropTypes.string.isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  setUsersPerPage: PropTypes.func.isRequired,
}

export default UsersTable
