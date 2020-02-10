import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up('md')} {
    width: auto;
  }
`

export const SiteLink = styled(Link)`
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  display: block;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1e1e1e;

  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const LogoImg = styled.img`
  width: 100%;
  height: auto;
`
