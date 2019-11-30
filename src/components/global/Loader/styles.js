import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

export const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const CircularLoader = styled(CircularProgress)`
  animation-duration: 550ms;
`
