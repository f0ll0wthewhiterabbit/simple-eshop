import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`

export const Heading = styled(Typography)`
  margin: ${props => props.theme.spacing(2)}px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.bold};
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
`

export const Message = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.regular};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.2;
`
