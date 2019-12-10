import React from 'react'
import PropTypes from 'prop-types'

import Table from '../../../../../global/Table'
import { STORE_FIELD_USERS } from '../../../../../../constants'

const UsersTable = ({ usersList, selectedUsers, setSelectedUsers }) => {
  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
  ]

  return (
    <Table
      rows={usersList}
      headCells={headCells}
      title="Users"
      storeFieldName={STORE_FIELD_USERS}
      selectedItems={selectedUsers}
      setSelectedItems={setSelectedUsers}
    />
  )
}

UsersTable.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
}

export default UsersTable
