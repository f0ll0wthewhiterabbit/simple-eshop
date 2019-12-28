import styled from 'styled-components'
import { Container, Avatar, Typography } from '@material-ui/core'

export const Root = styled(Container)`
  max-width: 550px;
`

export const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.primary.main};
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(3)}px;
`
