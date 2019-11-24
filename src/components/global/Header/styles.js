import styled from 'styled-components'
import { IconButton, AppBar } from '@material-ui/core'

const Wrapper = styled(AppBar)`
  height: ${props => props.theme.sizing.headerHeight.xs};
  position: relative;
  z-index: 2;

  ${props => props.theme.breakpoints.up('sm')} {
    height: ${props => props.theme.sizing.headerHeight.sm};
  }
`

const MenuButton = styled(IconButton)`
  color: ${props => props.theme.palette.primary.contrastText};

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`

export { Wrapper, MenuButton }
