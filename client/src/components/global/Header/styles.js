import styled from 'styled-components'
import { IconButton, AppBar, Typography } from '@material-ui/core'

export const Wrapper = styled(AppBar)`
  height: ${props => props.theme.sizing.headerHeight.xs};
  position: relative;
  z-index: 2;

  ${props => props.theme.breakpoints.up('sm')} {
    height: ${props => props.theme.sizing.headerHeight.sm};
  }
`

export const MenuButton = styled(IconButton)`
  color: ${props => props.theme.palette.primary.contrastText};

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`

export const WarningMessage = styled(Typography)`
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
    text-align: right;
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
  }
`
