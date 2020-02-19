import styled from 'styled-components'
import { Drawer } from '@material-ui/core'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`

export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`

export const SidebarRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)}px;

  ${props => props.theme.breakpoints.up('lg')} {
    padding-top: 104px;
  }
`

export const Sidebar = styled(Drawer)`
  height: 100%;
  width: ${props => props.theme.sizing.sidebarWidth};
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: ${props => props.theme.sizing.sidebarWidth};
    background-color: ${props => props.theme.colors.background.sidebar};

    ${props => props.theme.breakpoints.up('lg')} {
      z-index: 1;
      position: absolute;
    }
  }
`

export const Main = styled.main`
  flex-grow: 1;
  padding: ${props => props.theme.spacing(3)}px;
  position: relative;
  overflow-x: auto;
  min-height: 250px;
  background-color: ${props => props.theme.colors.background.adminMain};
  transition: background-color 0.3s ease-out;
`
