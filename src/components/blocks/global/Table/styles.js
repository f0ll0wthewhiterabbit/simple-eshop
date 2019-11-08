import styled, { css } from 'styled-components'
import { Paper, Table, Toolbar, Typography } from '@material-ui/core'

const Root = styled.div`
  width: 100%;
  margin-top: ${props => props.theme.spacing(3)}px;
`

const Wrapper = styled(Paper)`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;
`

const TableWrapper = styled.div`
  overflow-x: auto;
`

const TableRoot = styled(Table)`
  min-width: 750px;
`

const ToolbarRoot = styled(Toolbar)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(1)}px;

  ${props =>
    props['data-highlighted'] &&
    css`
      color: #f50057;
      background-color: #fedfe9;
    `}
`

const ToolbarTitle = styled(Typography)`
  flex: 1 1 100%;
`

const Image = styled.img`
  width: ${props => props.theme.spacing(10)}px;
  height: auto;
`

export { Root, Wrapper, TableWrapper, TableRoot, ToolbarRoot, ToolbarTitle, Image }
