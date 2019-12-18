import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

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
  usersList: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isRemovable: PropTypes.bool.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedUsers: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  setSelectedUsers: PropTypes.func.isRequired,
}

export default UsersTable
