import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up('md')} {
    width: 250px;
    margin-bottom: 0;
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
  color: ${props => props.theme.colors.font.bold};

  ${props => props.theme.breakpoints.up('md')} {
    margin-left: 0;
    margin-right: 0;
  }
`

export const LogoImg = styled.img`
  width: 100%;
  height: auto;
  transition: filter 0.3s ease-in;

  ${props =>
    props.isDarkTheme &&
    `
      filter: brightness(4);
  `}
`
