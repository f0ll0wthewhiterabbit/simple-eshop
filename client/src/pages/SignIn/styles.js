import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Wrapper = styled.div`
  padding-top: ${props => props.theme.spacing(8)}px;
  padding-bottom: ${props => props.theme.spacing(12)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`
export const SignUpLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    text-decoration: underline;
  }
`
