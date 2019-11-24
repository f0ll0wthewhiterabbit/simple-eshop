import styled from 'styled-components'
import { Button, ListItemIcon, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Wrapper = styled.div``

const UserMenuButtonNormal = styled(Button)`
  color: ${props => props.theme.palette.primary.contrastText};
  text-transform: none;
`

const UserMenuButtonSmall = styled(IconButton)`
  color: ${props => props.theme.palette.primary.contrastText};
`

const ArrowIcon = styled(ExpandMoreIcon)`
  margin-left: 5px;
`

const IconWrapper = styled(ListItemIcon)`
  min-width: 35px;
`

export { Wrapper, UserMenuButtonNormal, UserMenuButtonSmall, ArrowIcon, IconWrapper }
