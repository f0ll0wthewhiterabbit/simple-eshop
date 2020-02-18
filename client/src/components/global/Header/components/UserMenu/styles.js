import styled from 'styled-components'
import { Button, ListItemIcon, IconButton, Menu } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.theme.breakpoints.up('md')} {
    width: 250px;
    text-align: right;
    justify-content: flex-end;
  }
`

export const UserMenuWrapper = styled(Menu)`
  .MuiMenu-paper {
    background-color: ${props => props.theme.colors.background.userMenu};
  }

  .MuiListItem-root:hover {
    background-color: ${props => props.theme.colors.font.extraLight};
  }
`

export const UserMenuButtonNormal = styled(Button)`
  margin-right: ${props => props.theme.spacing(1)}px;
  color: ${props => props.theme.colors.font.bold};
  text-transform: none;
  font-family: ${props => props.theme.font.family};
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
  overflow: hidden;

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.palette.secondary.main};
  }
`

export const UserMenuButtonSmall = styled(IconButton)`
  color: ${props => props.theme.colors.font.bold};
  margin-right: ${props => props.theme.spacing(1)}px;
`

export const ArrowIcon = styled(ExpandMoreIcon)`
  margin-left: 5px;
`

export const IconWrapper = styled(ListItemIcon)`
  min-width: 35px;
  color: ${props => props.theme.colors.font.bold};

  & + .MuiListItemText-root {
    .MuiListItemText-primary {
      color: ${props => props.theme.colors.font.bold};
      font-family: ${props => props.theme.font.family};
      font-size: 16px;
      font-weight: 500;
    }
  }
`

export const SignOutButton = styled(IconButton)`
  margin-right: 0;
  color: ${props => props.theme.colors.font.regular};
  transition: color 0.3s;

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.palette.secondary.main};
  }

  ${props => props.theme.breakpoints.up('md')} {
    margin-right: -14px;
  }
`
