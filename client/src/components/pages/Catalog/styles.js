import styled from 'styled-components'
import { Container, Typography } from '@material-ui/core'

export const Wrapper = styled(Container)`
  padding-top: ${props => props.theme.spacing(6)}px;
  padding-bottom: ${props => props.theme.spacing(8)}px;
  position: relative;
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(4)}px;
  font-size: 1.85rem;
`
