import styled from 'styled-components'
import { Avatar, Button } from '@material-ui/core'

const Wrapper = styled.div`
  margin-top: ${props => props.theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`

const Form = styled.form`
  width: 100%; /* Fix IE 11 issue */
  margin-top: ${props => props.theme.spacing(1)}px;
`

const SubmitButton = styled(Button)`
  margin: ${props => props.theme.spacing(3, 0, 2)};
`

export { Wrapper, IconWrapper, Form, SubmitButton }
