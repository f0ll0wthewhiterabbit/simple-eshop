import styled from 'styled-components'
import ExplicitIcon from '@material-ui/icons/Explicit'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: ${props => props['data-justify']};
  align-items: center;

  ${props => props.theme.breakpoints.up('lg')} {
    justify-content: flex-start;
  }
`

export const SiteLink = styled(Link)`
  display: block;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.palette.primary.contrastText};
`

export const LogoIcon = styled(ExplicitIcon)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

export const LogoTitle = styled(Typography)`
  display: block;
  font-size: 1rem;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 53px;
    height: 2px;
    background-color: #fff;
    top: 13px;
    left: -2px;
  }

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
    font-size: 1.25rem;

    &::before {
      content: '';
      width: 66px;
      top: 16px;
      left: -3px;
    }
  }
`
