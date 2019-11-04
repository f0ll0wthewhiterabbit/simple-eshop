import styled from 'styled-components'
import { Container, Typography } from '@material-ui/core'

const Wrapper = styled(Container)`
  padding-top: ${props => props.theme.unit.eight};
  padding-bottom: ${props => props.theme.unit.eight};
`

const Header = styled(Typography)`
  margin-bottom: 0.75em;
`

export { Wrapper, Header }
