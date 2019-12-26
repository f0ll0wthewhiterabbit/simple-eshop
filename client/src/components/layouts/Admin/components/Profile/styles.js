import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import teal from '@material-ui/core/colors/teal'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.spacing(4)}px;
  padding-bottom: ${props => props.theme.spacing(4)}px;
`

export const ProfileAvatar = styled(Avatar)`
  width: ${props => props.theme.spacing(6)}px;
  height: ${props => props.theme.spacing(6)}px;
  margin-bottom: 5px;
  background-color: ${teal[500]};
  letter-spacing: -1px;
`
