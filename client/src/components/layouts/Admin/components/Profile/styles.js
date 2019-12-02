import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'

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
`
