import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { FIELDS } from '../../../../constants'
import { Wrapper, SelectFormControl, SelectItem } from './styles'

const FilterSelect = ({ filter, isDarkTheme, fetchProductsRequest, setProductsFilter }) => {
  const listProps = isDarkTheme ? { style: { backgroundColor: '#687579' } } : {}

  const handleChange = event => {
    const { value } = event.target

    if (value === filter) {
      return
    }

    setProductsFilter(value)

    fetchProductsRequest(1, { filter: value })
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
            MenuListProps: listProps,
          }}
        >
          <SelectItem value={FIELDS.URL_NO_FILTER}>All</SelectItem>
          <SelectItem value={FIELDS.URL_RATINGS_FILTER}>My ratings</SelectItem>
        </Select>
      </SelectFormControl>
    </Wrapper>
  )
}

FilterSelect.propTypes = {
  filter: PropTypes.string.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
  fetchProductsRequest: PropTypes.func.isRequired,
  setProductsFilter: PropTypes.func.isRequired,
}

export default FilterSelect
