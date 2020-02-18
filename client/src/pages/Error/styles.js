import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 24px * 2); /* minus double padding of parent <main /> */
`

export const LinkWrapper = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
`

export const BackLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};
  font-family: ${props => props.theme.font.family};
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;

  &:hover {
    text-decoration: underline;
  }
`
