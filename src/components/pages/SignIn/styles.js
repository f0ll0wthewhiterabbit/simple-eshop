import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
const SignUpLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    text-decoration: underline;
  }
`

export { Wrapper, IconWrapper, SignUpLink }
