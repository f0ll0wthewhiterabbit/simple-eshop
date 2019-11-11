import React from 'react'

import Table from '../../../global/Table'
import mockUserList from '../../../../data/users.json'

const UsersPage = () => {
  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
  ]

  return <Table rows={mockUserList} headCells={headCells} title="Users" />
}

export default UsersPage
