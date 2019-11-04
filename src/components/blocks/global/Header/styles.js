import styled from 'styled-components'
import ShopTwoRoundedIcon from '@material-ui/icons/ShopTwoRounded'
import { Typography } from '@material-ui/core'

const LogoWrapper = styled.a`
  display: block;
  flex-grow: 1;
  display: flex;
  align-items: center;
`

const LogoIcon = styled(ShopTwoRoundedIcon)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

const LogoTitle = styled(Typography)`
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
  }
`
export { LogoIcon, LogoTitle, LogoWrapper }
