import styled from 'styled-components'
import { Paper, InputBase, IconButton } from '@material-ui/core'

export const Wrapper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
`

export const Input = styled(InputBase)`
  margin-left: ${props => props.theme.spacing(1)}px;
  flex: 1;
`

export const IconWrapper = styled(IconButton)`
  padding: 10px;
`
