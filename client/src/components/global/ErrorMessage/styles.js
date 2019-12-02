import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`

export const Heading = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
  font-weight: 500;
`

export const Message = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
  font-weight: 400;
`
