import styled from 'styled-components'
import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(3)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(5, 0, 2)};
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`

export const Progress = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.26);
`

export const InputField = styled(TextField)`
  .text-input,
  .helper-text,
  .input-label {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }
`

export const ErrorMessage = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
`
