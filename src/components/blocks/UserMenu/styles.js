import styled from 'styled-components'
import { Button, ListItemIcon } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const UserMenuButton = styled(Button)`
  color: ${props => props.theme.colors.fontLight};
  text-transform: none;
`

const ArrowIcon = styled(ExpandMoreIcon)`
  margin-left: 5px;
`

const IconWrapper = styled(ListItemIcon)`
  min-width: 35px;
`

export { UserMenuButton, ArrowIcon, IconWrapper }
