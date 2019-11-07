import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Menu, MenuItem, ListItemText, useMediaQuery } from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import {
  Wrapper,
  UserMenuButtonNormal,
  UserMenuButtonSmall,
  ArrowIcon,
  IconWrapper,
} from './styles'

const UserMenu = ({ theme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMobileDevice = !useMediaQuery(theme.breakpoints.up('sm'))

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const userMenuButton = isMobileDevice ? (
    <UserMenuButtonSmall aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <AccountBoxIcon />
    </UserMenuButtonSmall>
  ) : (
    <UserMenuButtonNormal aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      Username <ArrowIcon />
    </UserMenuButtonNormal>
  )

  return (
    <Wrapper>
      {userMenuButton}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>
          <IconWrapper>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary="Username" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconWrapper>
            <HighlightOffOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary="Delete Account" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconWrapper>
            <ExitToAppOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </Wrapper>
  )
}

UserMenu.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.object.isRequired,
  }).isRequired,
}

export default withTheme(UserMenu)
