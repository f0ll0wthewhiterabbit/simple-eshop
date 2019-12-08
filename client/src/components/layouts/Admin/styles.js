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
    padding-top: ${props => props.theme.spacing(8)}px;
  }
`

export const Sidebar = styled(Drawer)`
  height: 100%;
  width: ${props => props.theme.sizing.sidebarWidth};
  flex-shrink: 0;

  .MuiDrawer-paper {
    width: ${props => props.theme.sizing.sidebarWidth};

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
`
