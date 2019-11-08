import styled from 'styled-components'
import { IconButton, Drawer } from '@material-ui/core'

const Wrapper = styled.div`
  display: flex;
`

const Navigation = styled.nav`
  ${props => props.theme.breakpoints.up('lg')} {
    width: ${props => props.theme.sizing.sidebarWidth};
    flex-shrink: 0;
  }
`

const Sidebar = styled(Drawer)`
  .MuiDrawer-paper {
    width: ${props => props.theme.sizing.sidebarWidth};

    ${props => props.theme.breakpoints.up('lg')} {
      z-index: 1;
      position: absolute;
    }
  }
`

const SidebarRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up('lg')} {
    padding-top: ${props => props.theme.spacing(8)}px;
  }
`
const MenuButton = styled(IconButton)`
  position: absolute;
  top: 3px;
  left: 20px;
  color: ${props => props.theme.palette.primary.contrastText};
  z-index: 3;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${props => props.theme.breakpoints.up('sm')} {
    top: 7px;
  }

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`
const Main = styled.main`
  flex-grow: 1;
  padding: ${props => props.theme.spacing(3)}px;
`

export { Wrapper, Navigation, MenuButton, Sidebar, SidebarRoot, Main }
