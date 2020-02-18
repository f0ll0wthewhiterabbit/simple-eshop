import styled from 'styled-components'
import { Container, Typography, Grid } from '@material-ui/core'

export const Wrapper = styled(Container)`
  padding-top: ${props => props.theme.spacing(7)}px;
  padding-bottom: ${props => props.theme.spacing(8)}px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.bold};
  font-size: 34px;
  font-weight: 600;

  span {
    color: ${props => props.theme.colors.accent};
  }

  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: ${props => props.theme.spacing(4)}px;
    font-size: 42px;
  }
`

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing(4)}px;

  ${props => props.theme.breakpoints.up('sm')} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const ContentWrapper = styled.div`
  min-height: 100px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const CardsWrapper = styled(Grid)`
  flex-grow: 1;
  margin-bottom: 40px;
`
