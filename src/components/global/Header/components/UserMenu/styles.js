import styled from 'styled-components'
import { Button, ListItemIcon, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const Wrapper = styled.div``

export const UserMenuButtonNormal = styled(Button)`
  color: ${props => props.theme.palette.primary.contrastText};
  text-transform: none;
`

export const UserMenuButtonSmall = styled(IconButton)`
  color: ${props => props.theme.palette.primary.contrastText};
`

export const ArrowIcon = styled(ExpandMoreIcon)`
  margin-left: 5px;
`

export const IconWrapper = styled(ListItemIcon)`
  min-width: 35px;
`
