import styled from 'styled-components'
import ShopTwoRoundedIcon from '@material-ui/icons/ShopTwoRounded'
import { Typography, FormControl } from '@material-ui/core'

const LogoWrapper = styled.a`
  display: block;
  flex-grow: 1;
  display: flex;
  align-items: center;
`

const LogoIcon = styled(ShopTwoRoundedIcon)`
  margin-right: ${props => props.theme.unit.single};
`

const LogoTitle = styled(Typography)`
  display: none;

  @media (min-width: ${props => props.theme.width.tablet}) {
    display: block;
  }
`

const UserMenu = styled(FormControl)`
  margin: ${props => props.theme.unit.single};
  min-width: 110px;
`

export { LogoIcon, LogoTitle, UserMenu, LogoWrapper }
