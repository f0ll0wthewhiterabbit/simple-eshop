import styled from 'styled-components'
import { IconButton, Typography } from '@material-ui/core'

export const Wrapper = styled.header``

export const MainSection = styled.div`
  padding: ${props => props.theme.spacing(4, 5, 2)};
  position: relative;
  z-index: 2;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  ${props => props.theme.breakpoints.up('md')} {
    padding-top: 0;
    padding-bottom: 0;
    height: 104px;
  }
`

export const MenuButton = styled(IconButton)`
  color: ${props => props.theme.palette.primary.contrastText};

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${props => props.theme.breakpoints.up('md')} {
    display: none;
  }
`

export const WarningMessage = styled(Typography)`
  display: block;
  position: absolute;
  bottom: 3px;
  right: 0;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.palette.secondary.main};
  text-align: center;

  ${props => props.theme.breakpoints.up('md')} {
    right: 32px;
    text-align: right;
  }
`
