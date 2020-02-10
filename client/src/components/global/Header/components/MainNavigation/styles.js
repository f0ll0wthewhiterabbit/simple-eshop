import styled from 'styled-components'

export const Wrapper = styled.nav`
  width: 100%;

  ${props => props.theme.breakpoints.up('md')} {
    width: auto;
  }
`

export const NavigationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  ${props => props.theme.breakpoints.up('md')} {
    width: auto;
    justify-content: flex-start;
  }
`

export const NavigationItem = styled.li`
  margin-right: 20px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.up('lg')} {
    margin-right: 60px;
  }
`

export const NavigationLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  color: #1e1e1e;
  font-size: 16px;
  font-weight: 500;
  line-height: 42px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 7px;
    width: 100%;
    height: 2px;
    background: #1e1e1e;
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }

  &:hover,
  &:focus {
    &::after {
      opacity: 1;
    }
  }
`
