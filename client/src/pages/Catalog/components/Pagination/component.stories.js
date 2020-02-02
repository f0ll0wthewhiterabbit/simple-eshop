import React from 'react'
import { action } from '@storybook/addon-actions'

import Pagination from './component'

export default {
  title: 'Pagination',
  component: Pagination,
  excludeStories: /.*Data$/,
}

export const paginationData = {
  currentPage: 5,
  totalPages: 10,
  filter: '',
}

export const actionsData = {
  fetchProducts: action('fetchProducts'),
  confirmMethod: action('confirmMethod'),
}

export const normal = () => <Pagination {...paginationData} {...actionsData} />
export const firstPage = () => <Pagination {...paginationData} currentPage={1} {...actionsData} />
export const lastPage = () => (
  <Pagination {...paginationData} currentPage={paginationData.totalPages} {...actionsData} />
)
