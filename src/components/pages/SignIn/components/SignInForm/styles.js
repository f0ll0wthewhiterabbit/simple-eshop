import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
  min-height: 36px;
`

export const Progress = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.26);
`
