import styled from 'styled-components'
import { Container, Typography } from '@material-ui/core'

const Wrapper = styled(Container)`
  padding-top: ${props => props.theme.spacing(6)}px;
  padding-bottom: ${props => props.theme.spacing(6)}px;
`

const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(4)}px;
`

export { Wrapper, Heading }
