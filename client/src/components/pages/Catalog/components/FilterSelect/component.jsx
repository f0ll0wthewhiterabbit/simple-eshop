import React from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem } from '@material-ui/core'

import { Wrapper, SelectFormControl } from './styles'
import { URL_FIELD_NO_FILTER, URL_FIELD_RATINGS_FILTER } from '../../../../../constants'

const FilterSelect = ({ filter, fetchProducts, setProductsFilter }) => {
  const handleChange = event => {
    const { value } = event.target
    if (value === filter) {
      return
    }

    setProductsFilter(value)

    fetchProducts(1, null, value)
  }

  return (
    <Wrapper>
      <SelectFormControl>
        <Select value={filter} onChange={handleChange} data-test="select">
          <MenuItem value={URL_FIELD_NO_FILTER}>All</MenuItem>
          <MenuItem value={URL_FIELD_RATINGS_FILTER}>My ratings</MenuItem>
        </Select>
      </SelectFormControl>
    </Wrapper>
  )
}

FilterSelect.propTypes = {
  filter: PropTypes.string.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  setProductsFilter: PropTypes.func.isRequired,
}

export default FilterSelect
