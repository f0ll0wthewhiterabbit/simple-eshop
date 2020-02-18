import styled from 'styled-components'
import BuildIcon from '@material-ui/icons/Build'

export const Wrapper = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 24px 35px;
  width: 100%;
  text-align: center;
`

export const Icon = styled(BuildIcon)`
  color: ${props => props.theme.colors.font.extraLight};
  font-size: 75px;
`
