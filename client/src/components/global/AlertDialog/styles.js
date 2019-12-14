import styled from 'styled-components'
import { Dialog } from '@material-ui/core'

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    padding-top: ${props => props.theme.spacing(1)}px;
    padding-bottom: ${props => props.theme.spacing(1)}px;
  }
`
