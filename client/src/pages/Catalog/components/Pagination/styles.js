import styled from 'styled-components'
import { IconButton } from '@material-ui/core'

export const PaginationList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

export const PaginationItem = styled.li`
  border: 1px solid #aaa;
  border-right: none;

  &:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
    border-right: 1px solid #aaa;
  }
`

export const PaginationButton = styled(IconButton)`
  border-radius: 0;
  min-width: 30px;
  height: 28px;
  padding: 0;
  font-size: 1.05rem;
  color: #aaa;
  background-color: none;

  ${props =>
    props.active &&
    `
    background-color: #aaa;
    color: #fff;
    cursor: default;
  `}

  &:hover {
    ${props =>
      props.active &&
      `
    background-color: #aaa;
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
