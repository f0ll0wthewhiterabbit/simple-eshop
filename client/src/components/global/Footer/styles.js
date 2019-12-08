import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Wrapper = styled.footer`
  margin-top: auto;
  position: relative;
  z-index: 2;
  background-color: ${props => props.theme.palette.grey[200]};
  padding: ${props => props.theme.spacing(2, 0, 4)};
`

export const Info = styled(Typography)`
  font-size: 0.9rem;
  line-height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.theme.breakpoints.up('sm')} {
    line-height: 21px;
    font-size: 1rem;
  }
`

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-left: 5px;
  margin-right: 5px;
`

export const SiteLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`