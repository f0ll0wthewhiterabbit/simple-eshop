import styled from 'styled-components'
import { IconButton } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: nowrap;
`

export const PaginationList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
`

export const PaginationItem = styled.li`
  margin-right: 18px;

  &:last-child {
    margin-right: 0;
  }
`

export const PaginationButton = styled(IconButton)`
  border-radius: 0;
  min-width: 20px;
  height: 28px;
  padding: 0;
  background-color: transparent;
  font-family: 'Montserrat', sans-serif;
  color: #838383;
  font-size: 12px;
  font-weight: 500;
  position: relative;

  &::after {
    display: block;
    position: absolute;
    left: 5px;
    bottom: -5px;
    width: 10px;
    height: 2px;
    background: #000;
    content: '';
    opacity: 0;
    transition: all 0.3s;
  }

  ${props =>
    props.active &&
    `
    color: #000;

    &::after {
      opacity: 1;
    }
  `}

  &:hover {
    background-color: transparent;
    color: #000;

    &::after {
      opacity: 1;
    }

    ${props =>
      props.active &&
      `
      cursor: default;
    `}
  }

  &:first-child {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }

  &:last-child {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
`

export const Label = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #838383;
  font-size: 12px;
  font-weight: 500;
  margin-right: 24px;
`
