import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

export const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

export const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
`

export const TagsInput = styled(ChipInput)`
  margin-bottom: 20px;

  .MuiInputBase-root {
    padding-bottom: 6px;
  }
`

export const FileInput = styled.input`
  display: none;
`

export const Label = styled.label``

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const UploadButton = styled(Button)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

export const Progress = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.26);
`
