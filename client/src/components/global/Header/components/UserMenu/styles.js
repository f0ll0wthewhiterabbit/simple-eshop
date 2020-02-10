import styled from 'styled-components'
import { Button, ListItemIcon, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;

  ${props => props.theme.breakpoints.up('md')} {
    width: 200px;
    text-align: right;
  }
`

export const UserMenuButtonNormal = styled(Button)`
  margin-right: ${props => props.theme.spacing(1)}px;
  color: #1e1e1e;
  text-transform: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.palette.secondary.main};
  }
`

export const UserMenuButtonSmall = styled(IconButton)`
  color: #1e1e1e;
`

export const ArrowIcon = styled(ExpandMoreIcon)`
  margin-left: 5px;
`

export const IconWrapper = styled(ListItemIcon)`
  min-width: 35px;

  & + .MuiListItemText-root {
    .MuiListItemText-primary {
      color: #1e1e1e;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: 500;
    }
  }
`

export const SignOutButton = styled(IconButton)`
  margin-right: 0;
  transition: color 0.3s;

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.palette.secondary.main};
  }

  ${props => props.theme.breakpoints.up('md')} {
    margin-right: -14px;
  }
`
