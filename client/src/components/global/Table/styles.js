import styled, { css } from 'styled-components'
import { Paper, Table, Toolbar, Typography, TablePagination } from '@material-ui/core'

export const Root = styled.div`
  width: 100%;
  margin-top: ${props => props.theme.spacing(3)}px;
`

export const Wrapper = styled(Paper)`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing(2)}px;
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

  .MuiCheckbox-root {
    color: ${props => props.theme.colors.font.regular};

    &.Mui-disabled {
      color: ${props => props.theme.colors.font.light};
    }

    &.Mui-checked {
      color: #f50057;
    }
  }

  .MuiLink-underlineHover {
    color: ${props => props.theme.colors.font.link};
  }
`

export const ToolbarRoot = styled(Toolbar)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(1)}px;
  color: ${props => props.theme.colors.font.bold};

  ${props =>
    props['data-highlighted'] &&
    css`
      color: #f50057;
      background-color: ${props.theme.colors.background.toolbar.highlighted};
    `}

  button {
    color: ${props => props.theme.colors.background.toolbar.button};
  }
`

export const ToolbarTitle = styled(Typography)`
  flex: 1 1 100%;
`

export const Image = styled.img`
  width: ${props => props.theme.spacing(10)}px;
  height: auto;
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
