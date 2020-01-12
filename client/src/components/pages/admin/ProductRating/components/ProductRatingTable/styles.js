import styled, { css } from 'styled-components'
import { Paper, Table, Toolbar, Typography } from '@material-ui/core'

export const Root = styled.div`
  width: 100%;
  margin-top: ${props => props.theme.spacing(3)}px;
`

export const Wrapper = styled(Paper)`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;
  position: relative;
`

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const TableRoot = styled(Table)`
  min-width: 750px;
`

export const ToolbarRoot = styled(Toolbar)`
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(1)}px;

  ${props =>
    props['data-highlighted'] &&
    css`
      color: #f50057;
      background-color: #fedfe9;
    `}
`

export const ToolbarTitleWrapper = styled.div`
  flex: 1 1 100%;
`

export const Heading = styled(Typography)`
  font-weight: 500;
`

export const SubHeading = styled(Typography)`
  font-weight: 400;
`

export const Comment = styled(Typography)`
  position: absolute;
  bottom: 16px;
  left: 16px;
`
