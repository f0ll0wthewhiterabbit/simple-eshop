import styled from 'styled-components'
import { Paper, Table, Toolbar, Typography, TablePagination } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

export const Root = styled.div`
  width: 100%;
  margin-top: ${props => props.theme.spacing(3)}px;
`

export const Wrapper = styled(Paper)`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;
  position: relative;
  background-color: ${props => props.theme.colors.background.table};
  transition: background-color 0.3s ease-out;
`

export const TableWrapper = styled.div`
  overflow-x: auto;
`

export const TableRoot = styled(Table)`
  min-width: 750px;

  .MuiTableCell-head {
    color: ${props => props.theme.colors.font.bold};
  }

  .MuiTableCell-body {
    color: ${props => props.theme.colors.font.regular};
  }
`

export const ToolbarRoot = styled(Toolbar)`
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(1)}px;
  color: ${props => props.theme.colors.font.bold};
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
  display: none;

  ${props => props.theme.breakpoints.up('sm')} {
    display: block;
    position: absolute;
    bottom: 16px;
    left: 16px;
  }
`

export const TablePaginationPanel = styled(TablePagination)`
  color: ${props => props.theme.colors.font.bold};

  .MuiTablePagination-input svg {
    color: ${props => props.theme.colors.font.bold};
  }

  .MuiTablePagination-actions .Mui-disabled {
    color: ${props => props.theme.colors.font.light};
  }

  .MuiToolbar-root {
    justify-content: space-around;
  }

  .MuiTablePagination-caption:first-of-type {
    display: none;
  }

  .MuiTablePagination-spacer {
    display: none;
  }

  ${props => props.theme.breakpoints.up('sm')} {
    .MuiToolbar-root {
      justify-content: flex-end;
    }

    .MuiTablePagination-caption:first-of-type {
      display: block;
    }

    .MuiTablePagination-spacer {
      display: block;
    }
  }
`

export const Stars = styled(Rating)`
  .MuiRating-iconEmpty {
    color: ${props => props.theme.colors.font.light};
  }
`
