import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
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
import { STORE_FIELD_CURRENT_USER, PROFILE_PAGE_PATH } from '../../../../../constants'

export const UserMenu = ({
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
    <UserMenuButtonSmall
      aria-controls="simple-menu"
      aria-haspopup="true"
      onClick={handleClick}
      data-test="menuButton"
    >
      <AccountBoxIcon />
    </UserMenuButtonSmall>
  ) : (
    <UserMenuButtonNormal
      aria-controls="simple-menu"
      aria-haspopup="true"
      onClick={handleClick}
      data-test="menuButton"
    >
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
        data-test="menu"
      >
        <MenuItem
          component={Link}
          to={PROFILE_PAGE_PATH}
          onClick={handleClose}
          data-test="profileButton"
        >
          <IconWrapper>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary={userName} />
        </MenuItem>
        {!isAdmin && !isDeleteRequestSent && (
          <MenuItem onClick={handleDeleteAccountClick} data-test="deleteAccountButton">
            <IconWrapper>
              <HighlightOffOutlinedIcon fontSize="small" />
            </IconWrapper>
            <ListItemText primary="Delete Account" />
          </MenuItem>
        )}
        <MenuItem onClick={handleSignOutClick} data-test="signOutButton">
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
