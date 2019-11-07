import styled from 'styled-components'
import ShopTwoRoundedIcon from '@material-ui/icons/ShopTwoRounded'
import { Typography } from '@material-ui/core'

const LogoWrapper = styled.a`
  display: block;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.theme.breakpoints.up('lg')} {
    justify-content: flex-start;
  }
`

const LogoIcon = styled(ShopTwoRoundedIcon)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

const LogoTitle = styled(Typography)`
  display: block;
  font-size: 1rem;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
    font-size: 1.25rem;
  }
`

export { LogoIcon, LogoTitle, LogoWrapper }
