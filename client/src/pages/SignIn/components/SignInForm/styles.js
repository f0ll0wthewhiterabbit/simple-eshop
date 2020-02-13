import styled from 'styled-components'
import {
  Button,
  CircularProgress,
  TextField,
  FormControlLabel,
  Typography,
} from '@material-ui/core'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
  min-height: 36px;
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

export const CheckboxLabel = styled(FormControlLabel)`
  margin-top: 10px;

  .MuiFormControlLabel-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
`

export const ErrorMessage = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
`
