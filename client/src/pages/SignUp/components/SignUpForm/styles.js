import styled from 'styled-components'
import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(3)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(5, 0, 2)};
  font-family: ${props => props.theme.font.family};
  font-weight: 500;
  color: ${props => props.theme.colors.font.contrast};
  transition: color 0.25s;

  && {
    background-color: ${props =>
      props.disabled
        ? props.theme.colors.background.button.disabled
        : props.theme.colors.background.button.normal};
    color: ${props =>
      props.disabled ? props.theme.colors.font.light : props.theme.colors.font.contrast};
  }
`

export const Progress = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.26);
`

export const InputField = styled(TextField)`
  .text-input {
    color: ${props => props.theme.colors.font.bold};
  }

  .input-label {
    color: ${props => props.theme.colors.font.light};
  }

  .Mui-error {
    color: ${props => props.theme.palette.error.main};
  }

  .text-input,
  .helper-text,
  .input-label {
    font-family: ${props => props.theme.font.family};
    font-weight: 400;
  }

  .MuiInput-underline {
    &:before {
      border-bottom-color: ${props => props.theme.colors.font.light};
    }

    &:after {
      border-bottom-color: ${props => props.theme.colors.font.bold};
    }
  }

  .MuiInput-underline.Mui-error {
    &:before {
      border-bottom-color: ${props => props.theme.palette.error.main};
    }

    &:after {
      border-bottom-color: ${props => props.theme.palette.error.main};
    }
  }

  &:hover {
    .MuiInput-underline {
      &:before {
        border-bottom-color: ${props => props.theme.colors.font.bold};
      }

      &:after {
        border-bottom-color: ${props => props.theme.colors.font.bold};
      }
    }
  }
`

export const ErrorMessage = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  font-weight: 400;
`
