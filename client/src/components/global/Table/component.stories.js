import React from 'react'
import { action } from '@storybook/addon-actions'
import { List, Record } from 'immutable'

import Table from './component'
import { ROLE_USER, STORE_FIELD_USERS } from '../../../constants'

export default {
  title: 'Table',
  component: Table,
  excludeStories: /.*Data$/,
}

const usersListData = List([
  Record({
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    isRemovable: false,
    role: ROLE_USER,
  })(),
  Record({
    _id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@email.com',
    isRemovable: true,
    role: ROLE_USER,
  })(),
])

const headCellsData = [
  { id: 'firstName', label: 'First Name', isNumeric: false },
  { id: 'lastName', label: 'Last Name', isNumeric: false },
  { id: 'email', label: 'Email', isNumeric: false },
]

export const tableData = {
  rows: usersListData,
  rowsPerPage: 10,
  currentPage: 1,
  totalAmount: 2,
  headCells: headCellsData,
  title: 'Users',
  storeFieldName: STORE_FIELD_USERS,
  selectedItems: [],
}

export const actionsData = {
  setSelectedItems: action('setSelectedItems'),
  setRowsPerPage: action('setRowsPerPage'),
  fetchData: action('fetchData'),
}

export const normal = () => <Table {...tableData} {...actionsData} />
