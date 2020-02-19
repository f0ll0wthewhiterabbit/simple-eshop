import styled from 'styled-components'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
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
  color: ${props => props.theme.colors.font.light};
`

export const FileInput = styled.input`
  display: none;
`

export const Label = styled.label``

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    color: ${props => props.theme.colors.font.bold};
  }
`

export const UploadButton = styled(Button)`
  margin-right: ${props => props.theme.spacing(1)}px;
  color: ${props => props.theme.colors.font.bold};
  background-color: ${props => props.theme.colors.background.tag};
`

export const InputField = styled(TextField)`
  .MuiInputBase-input {
    color: ${props => props.theme.colors.font.bold};
  }

  .MuiInputLabel-root {
    color: ${props => props.theme.colors.font.light};
  }

  .Mui-error {
    color: ${props => props.theme.palette.error.main};
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.theme.colors.font.light};
  }

  &:hover {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.colors.font.bold};
    }
  }
`

export const TagsInput = styled(ChipInput)`
  margin-bottom: 20px;

  .MuiInputBase-root {
    padding-bottom: 6px;
  }

  .MuiInputBase-input {
    color: ${props => props.theme.colors.font.bold};
  }

  .MuiInputLabel-root {
    color: ${props => props.theme.colors.font.light};
  }

  .MuiChip-root {
    color: ${props => props.theme.colors.font.bold};
    background-color: ${props => props.theme.colors.background.tag};
  }

  .MuiFormHelperText-root {
    color: ${props => props.theme.colors.font.light};
  }

  && fieldset {
    border-color: ${props => props.theme.colors.font.light};
  }

  &:hover {
    && fieldset {
      border-color: ${props => props.theme.colors.font.bold};
    }
  }
`
