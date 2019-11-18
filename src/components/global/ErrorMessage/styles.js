import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`

const Heading = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
  font-weight: 500;
`

const Message = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
  font-weight: 400;
`

export { Wrapper, IconWrapper, Heading, Message }
