import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { URL_FIELD_NO_FILTER, URL_FIELD_RATINGS_FILTER } from '../../../../constants'
import { Wrapper, SelectFormControl, SelectItem } from './styles'

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
        <Select
          value={filter}
          onChange={handleChange}
          IconComponent={ExpandMoreIcon}
          data-test="select"
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          <SelectItem value={URL_FIELD_NO_FILTER}>All</SelectItem>
          <SelectItem value={URL_FIELD_RATINGS_FILTER}>My ratings</SelectItem>
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
