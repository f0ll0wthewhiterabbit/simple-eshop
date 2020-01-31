import styled from 'styled-components'
import { Container, Typography, Grid } from '@material-ui/core'

export const Wrapper = styled(Container)`
  padding-top: ${props => props.theme.spacing(6)}px;
  padding-bottom: ${props => props.theme.spacing(8)}px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(2)}px;
  font-size: 1.85rem;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: ${props => props.theme.spacing(4)}px;
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
`
