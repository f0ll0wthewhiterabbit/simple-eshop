import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

export const Wrapper = styled.div`
  padding-top: ${props => props.theme.spacing(8)}px;
  padding-bottom: ${props => props.theme.spacing(12)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(3)}px;
  font-size: 1.85rem;
  font-family: ${props => props.theme.font.family};
  font-weight: 500;
  color: ${props => props.theme.colors.font.bold};
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${green[500]};
  width: ${props => props.theme.spacing(7)}px;
  height: ${props => props.theme.spacing(7)}px;
  font-size: 1.5rem;
  letter-spacing: -1px;
`
