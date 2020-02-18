import styled from 'styled-components'
import { Dialog } from '@material-ui/core'

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    padding-top: ${props => props.theme.spacing(1)}px;
    padding-bottom: ${props => props.theme.spacing(1)}px;
    background-color: ${props => props.theme.colors.background.alertDialog};
  }

  .MuiDialogTitle-root h2 {
    color: ${props => props.theme.colors.font.bold};
  }

  .MuiDialogContent-root p {
    color: ${props => props.theme.colors.font.regular};
  }

  .MuiDialogActions-root button:first-child {
    background-color: #fff;
  }
`
