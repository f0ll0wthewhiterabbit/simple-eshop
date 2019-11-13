import styled from 'styled-components'
import ExplicitIcon from '@material-ui/icons/Explicit'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const SiteLink = styled(Link)`
  display: block;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${props => props.theme.palette.primary.contrastText};

  ${props => props.theme.breakpoints.up('lg')} {
    justify-content: flex-start;
  }
`

const LogoIcon = styled(ExplicitIcon)`
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

export { LogoIcon, LogoTitle, SiteLink }
