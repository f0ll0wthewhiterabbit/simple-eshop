import React from 'react'
import PropTypes from 'prop-types'
import { Switch } from '@material-ui/core'

import { FIELDS } from '../../../../../../../constants'
import { Wrapper } from './styles'

const ThemeSwitcher = ({ isDarkTheme, toggleTheme }) => {
  const handleThemeChange = () => {
    const nextTheme = isDarkTheme ? FIELDS.THEME_DEFAULT : FIELDS.THEME_DARK
    toggleTheme(nextTheme)
  }

  return (
    <Wrapper>
      <Switch checked={isDarkTheme} onChange={handleThemeChange} size="small" />
    </Wrapper>
  )
}

ThemeSwitcher.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default ThemeSwitcher
