import styled from 'styled-components'
import { Button, CircularProgress } from '@material-ui/core'

const StyledForm = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(3)}px;
`

const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
`

const Progress = styled(CircularProgress)`
  color: rgba(0, 0, 0, 0.26);
`

export { StyledForm, SubmitButton, Progress }
