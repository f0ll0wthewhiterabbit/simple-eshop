import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'

import { Wrapper, Input, IconWrapper } from './styles'

const SearchForm = ({ placeholder, itemsPerPage, searchMethod, setSearchQueryMethod }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = evt => {
    setInputValue(evt.target.value)
  }

  const handleFormSubmit = evt => {
    evt.preventDefault()
    setSearchQueryMethod(inputValue)
    searchMethod(1, itemsPerPage, inputValue)
  }

  return (
    <Wrapper component="form" onSubmit={handleFormSubmit}>
      <Input
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder.toLowerCase() }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <IconWrapper type="submit" aria-label="search">
        <SearchIcon />
      </IconWrapper>
    </Wrapper>
  )
}

SearchForm.propTypes = {
  placeholder: PropTypes.string.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  searchMethod: PropTypes.func.isRequired,
  setSearchQueryMethod: PropTypes.func.isRequired,
}

export default SearchForm
