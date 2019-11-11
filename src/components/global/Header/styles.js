import styled from 'styled-components'
import { AppBar } from '@material-ui/core'

const Wrapper = styled(AppBar)`
  height: ${props => props.theme.sizing.headerHeight.xs};
  position: relative;
  z-index: 2;

  ${props => props.theme.breakpoints.up('sm')} {
    height: ${props => props.theme.sizing.headerHeight.sm};
  }
`

export default Wrapper
