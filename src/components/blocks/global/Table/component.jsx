import React from 'react'
import PropTypes from 'prop-types'
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { Root, Wrapper, TableWrapper, TableRoot, ToolbarRoot, ToolbarTitle, Image } from './styles'

const Table = ({ rows, headCells, title }) => {
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const numSelected = selected.length
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const removableRowsCount = rows.filter(row => row.isRemovable).length

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.filter(n => n.isRemovable).map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id, isRemovable) => {
    if (!isRemovable) {
      return
    }

    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const mapRowToTableCellContent = (id, row) => {
    if (id === 'tags') {
      return row[id].join(', ')
    }

    if (id === 'image') {
      return <Image src={row[id]} alt={row.title} />
    }

    return row[id]
  }

  const tableToolbar = (
    <ToolbarRoot data-highlighted={numSelected > 0}>
      {numSelected > 0 ? (
        <ToolbarTitle color="inherit" variant="subtitle1">
          {numSelected} selected
        </ToolbarTitle>
      ) : (
        <ToolbarTitle variant="h6" id="tableTitle">
          {title}
        </ToolbarTitle>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </ToolbarRoot>
  )

  const tableHead = (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.isNumeric ? 'center' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < removableRowsCount}
            checked={numSelected === removableRowsCount}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  )

  return (
    <Root>
      <Wrapper>
        {tableToolbar}
        <TableWrapper>
          <TableRoot aria-labelledby="tableTitle" aria-label="enhanced table">
            {tableHead}
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id, row.isRemovable)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {headCells.map(headCell => (
                        <TableCell key={headCell.id} align={headCell.isNumeric ? 'center' : 'left'}>
                          {mapRowToTableCellContent(headCell.id, row)}
                        </TableCell>
                      ))}
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          disabled={!row.isRemovable}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </TableRoot>
        </TableWrapper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Wrapper>
    </Root>
  )
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default Table
