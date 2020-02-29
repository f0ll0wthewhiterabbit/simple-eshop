import React from 'react'
import { action } from '@storybook/addon-actions'
import { List, Record } from 'immutable'

import Table from './component'
import { ROLES, FIELDS } from '../../../constants'

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
    role: ROLES.USER,
  })(),
  Record({
    _id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@email.com',
    isRemovable: true,
    role: ROLES.USER,
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
  storeFieldName: FIELDS.STORE_USERS,
  selectedItems: [],
}

export const actionsData = {
  setSelectedItems: action('setSelectedItems'),
  setRowsPerPage: action('setRowsPerPage'),
  fetchData: action('fetchData'),
}

export const normal = () => <Table {...tableData} {...actionsData} />
