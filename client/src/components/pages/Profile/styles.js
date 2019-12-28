import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

export const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Heading = styled(Typography)`
  margin-bottom: ${props => props.theme.spacing(3)}px;
  font-size: 1.85rem;
`

export const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${green[500]};
  width: ${props => props.theme.spacing(7)}px;
  height: ${props => props.theme.spacing(7)}px;
  font-size: 1.5rem;
  letter-spacing: -1px;
`