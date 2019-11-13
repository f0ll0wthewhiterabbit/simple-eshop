import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CircularLoader = styled(CircularProgress)`
  animation-duration: 550ms;
`

export { Root, CircularLoader }
