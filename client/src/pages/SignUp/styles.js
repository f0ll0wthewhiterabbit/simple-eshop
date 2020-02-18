import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'
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

export const SignInLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    text-decoration: underline;
  }
`

export const Heading = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  font-weight: 500;
  color: ${props => props.theme.colors.font.bold};
`

export const LinkInfo = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.regular};
`
