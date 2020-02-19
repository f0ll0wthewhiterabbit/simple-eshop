import styled from 'styled-components'
import { Paper, InputBase, IconButton } from '@material-ui/core'

export const Wrapper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  background-color: ${props => props.theme.colors.background.table};
  transition: background-color 0.3s ease-out;

  ${props => props.theme.breakpoints.up('sm')} {
    width: 300px;
    margin-bottom: 0;
  }
`

export const Input = styled(InputBase)`
  margin-left: ${props => props.theme.spacing(1)}px;
  color: ${props => props.theme.colors.font.bold};
  flex: 1;
`

export const IconWrapper = styled(IconButton)`
  padding: 10px;
  color: ${props => props.theme.colors.font.bold};
`
