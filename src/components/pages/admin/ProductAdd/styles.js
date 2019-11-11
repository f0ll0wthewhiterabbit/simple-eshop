import styled from 'styled-components'
import { Container, Avatar, Button } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'

const Root = styled(Container)`
  max-width: 550px;
`

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.primary.main};
`

const Form = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
`

const TagsInput = styled(ChipInput)`
  margin-bottom: 20px;

  .MuiInputBase-root {
    padding-bottom: 6px;
  }
`

const FileInput = styled.input`
  display: none;
`

const Label = styled.label`
  display: flex;
  align-items: center;
`

const UploadButton = styled(Button)`
  margin-right: ${props => props.theme.spacing(1)}px;
`

export { Root, Wrapper, IconWrapper, Form, SubmitButton, TagsInput, FileInput, Label, UploadButton }
