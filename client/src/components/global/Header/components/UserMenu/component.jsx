import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { MenuItem, ListItemText, useMediaQuery } from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import ThemeSwitcherContainer from './components/ThemeSwitcher'
import { FIELDS, PAGE_PATHS } from '../../../../../constants'
import {
  Wrapper,
  UserMenuWrapper,
  UserMenuButtonNormal,
  UserMenuButtonSmall,
  ArrowIcon,
  IconWrapper,
  SignOutButton,
} from './styles'

export const UserMenu = ({
  theme,
  userName,
  isAdmin,
  isDeleteRequestSent,
  showModal,
  signOutRequest,
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
    showModal(FIELDS.STORE_CURRENT_USER)
    handleClose()
  }

  const handleSignOutClick = () => {
    signOutRequest(history, location)
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
      <UserMenuWrapper
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        data-test="menu"
      >
        <MenuItem
          component={Link}
          to={PAGE_PATHS.PROFILE}
          onClick={handleClose}
          data-test="profileButton"
        >
          <IconWrapper>
            <PersonOutlineOutlinedIcon fontSize="small" />
          </IconWrapper>
          <ListItemText primary="Profile" />
        </MenuItem>
        {!isAdmin && !isDeleteRequestSent && (
          <MenuItem onClick={handleDeleteAccountClick} data-test="deleteAccountButton">
            <IconWrapper>
              <HighlightOffOutlinedIcon fontSize="small" />
            </IconWrapper>
            <ListItemText primary="Delete Account" />
          </MenuItem>
        )}
      </UserMenuWrapper>
      <ThemeSwitcherContainer />
      <SignOutButton
        onClick={handleSignOutClick}
        data-test="signOutButton"
        aria-label="sign-out"
        disableRipple
      >
        <ExitToAppIcon />
      </SignOutButton>
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
  signOutRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(withTheme(UserMenu))
