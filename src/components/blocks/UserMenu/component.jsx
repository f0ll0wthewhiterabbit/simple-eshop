import React from 'react'
import { Menu, MenuItem, ListItemText } from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'

import { UserMenuButton, ArrowIcon, IconWrapper } from './styles'

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <UserMenuButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Username <ArrowIcon />
      </UserMenuButton>
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
    </div>
  )
}

export default UserMenu
