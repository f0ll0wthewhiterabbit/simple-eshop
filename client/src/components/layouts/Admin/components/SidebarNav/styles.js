import styled from 'styled-components'
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { NavLink } from 'react-router-dom'

export const PagesList = styled(List)`
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;
`

export const NavigationItem = styled(ListItem)`
  padding: 0;
`

export const NavigationLink = styled(NavLink)`
  padding: ${props => props.theme.spacing(1, 2)};
  width: 100%;
  display: flex;
  position: relative;
  text-align: left;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  color: ${blueGrey[500]};

  &.active {
    color: ${blueGrey[800]};
    text-decoration: underline;
  }
`

export const PageIcon = styled(ListItemIcon)`
  color: inherit;
  min-width: ${props => props.theme.spacing(5)}px;
`

export const PageText = styled(ListItemText)`
  color: inherit;

  .MuiListItemText-primary {
    font-weight: ${props => props.theme.typography.fontWeightMedium};
    font-size: 0.875rem;
  }
`
