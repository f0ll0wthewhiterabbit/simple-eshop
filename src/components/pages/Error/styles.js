import styled from 'styled-components'
import { Avatar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const IconWrapper = styled(Avatar)`
  margin: ${props => props.theme.spacing(1)}px;
  background-color: ${props => props.theme.palette.secondary.main};
`

const Heading = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
`

const LinkWrapper = styled(Typography)`
  margin: ${props => props.theme.spacing(1)}px;
`

const BackLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover {
    text-decoration: underline;
  }
`

export { Wrapper, IconWrapper, LinkWrapper, Heading, BackLink }
