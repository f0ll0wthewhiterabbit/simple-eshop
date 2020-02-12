import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object, number } from '@storybook/addon-knobs/react'

import Pagination from './component'

export default {
  title: 'Pagination',
  component: Pagination,
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
}

export const paginationData = {
  currentPage: 5,
  totalPages: 10,
  totalAmount: 85,
  withLabel: false,
  withNumbers: true,
}

export const actionsData = {
  fetchProducts: action('fetchProducts'),
  confirmMethod: action('confirmMethod'),
}

export const normal = () => (
  <Pagination {...object('pagination', { ...paginationData })} {...actionsData} />
)
export const withLabel = () => (
  <Pagination
    {...paginationData}
    {...actionsData}
    withLabel
    totalAmount={number('totalAmount', 85, {
      range: true,
      min: 80,
      max: 90,
      step: 1,
    })}
  />
)
export const withCurrentPageNumberOnly = () => (
  <Pagination {...paginationData} {...actionsData} withNumbers={false} />
)
export const firstPage = () => <Pagination {...paginationData} currentPage={1} {...actionsData} />
export const lastPage = () => (
  <Pagination {...paginationData} currentPage={paginationData.totalPages} {...actionsData} />
)
