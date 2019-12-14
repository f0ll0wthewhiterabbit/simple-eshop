import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
import { STORE_FIELD_CURRENT_USER } from '../../../../../constants'

const UserMenu = ({
  theme,
  userName,
  isAdmin,
  isDeleteRequestSent,
  showModal,
  signOut,
  history,
  location,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const isMobileDevice = !useMediaQuery(theme.breakpoints.up('sm'))

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteAccountClick = () => {
    showModal(STORE_FIELD_CURRENT_USER)
    handleClose()
  }

  const handleSignOutClick = () => {
    signOut(history, location)
  }

  const userMenuButton = isMobileDevice ? (
    <UserMenuButtonSmall aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      <AccountBoxIcon />
    </UserMenuButtonSmall>
  ) : (
    <UserMenuButtonNormal aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {userName} <ArrowIcon />
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
          <ListItemText primary={userName} />
        </MenuItem>
        {!isAdmin && !isDeleteRequestSent && (
          <MenuItem onClick={handleDeleteAccountClick}>
            <IconWrapper>
              <HighlightOffOutlinedIcon fontSize="small" />
            </IconWrapper>
            <ListItemText primary="Delete Account" />
          </MenuItem>
        )}
        <MenuItem onClick={handleSignOutClick}>
          <IconWrapper>
            <ExitToAppOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </Wrapper>
  )
}

UserMenu.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.object.isRequired,
  }).isRequired,
  userName: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isDeleteRequestSent: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(withTheme(UserMenu))
