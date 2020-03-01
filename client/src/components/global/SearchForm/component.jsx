import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'

import { Wrapper, Input, IconWrapper } from './styles'

const SearchForm = ({
  placeholder,
  itemsPerPage,
  initialValue,
  searchMethod,
  setSearchQueryMethod,
}) => {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleFormSubmit = event => {
    event.preventDefault()
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
        autoFocus={inputValue !== ''}
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
  initialValue: PropTypes.string.isRequired,
  searchMethod: PropTypes.func.isRequired,
  setSearchQueryMethod: PropTypes.func.isRequired,
}

export default SearchForm
