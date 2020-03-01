import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { List } from 'immutable'
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
  Link as MuiLink,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import formatPrice from '../../../utils/formatPrice'
import { PAGE_PATHS, PAGE_LIMITS } from '../../../constants'
import { BASE_URL } from '../../../utils/api'
import {
  Root,
  Wrapper,
  TableWrapper,
  TableRoot,
  ToolbarRoot,
  ToolbarTitle,
  Image,
  TablePaginationPanel,
} from './styles'

const Table = ({
  isDarkTheme,
  rows,
  rowsPerPage,
  currentPage,
  totalAmount,
  headCells,
  title,
  storeFieldName,
  showModal,
  selectedItems,
  setSelectedItems,
  fetchData,
  setRowsPerPage,
}) => {
  const [page, setPage] = React.useState(0)

  const selectedItemsAmount = selectedItems.size
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.size - page * rowsPerPage)
  const removableRowsCount = rows.filter(row => ('isRemovable' in row ? row.isRemovable : true))
    .size

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const selectedIds = rows
        .filter(row => ('isRemovable' in row ? row.isRemovable : true))
        .map(row => row._id)

      setSelectedItems(selectedIds)
      return
    }

    setSelectedItems(List())
  }

  const handleClick = (event, id, isRemovable) => {
    if (!isRemovable) {
      return
    }

    const selectedIndex = selectedItems.indexOf(id)
    let newSelected = List()

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1))
    } else if (selectedIndex === selectedItems.size - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      )
    }

    setSelectedItems(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    const term = currentPage === newPage ? 1 : -1

    fetchData(currentPage + term, rowsPerPage)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selectedItems.indexOf(id) !== -1

  const mapRowToTableCellContent = (id, row) => {
    if (id === 'title') {
      return (
        <MuiLink component={Link} to={`${PAGE_PATHS.ADMIN_PRODUCTS}/${row._id}`}>
          {row.title}
        </MuiLink>
      )
    }

    if (id === 'tags') {
      if (row.tags.size === 0) {
        return '-'
      }

      return row.tags.join(', ')
    }

    if (id === 'image') {
      return <Image src={`${BASE_URL}/products/${row._id}/${row.imageName}`} alt={row.title} />
    }

    if (id === 'rating') {
      if (row.ratingInfo.votesAmount === 0) {
        return '-'
      }

      const averageRating = Math.round(row.ratingInfo.average)

      return (
        <MuiLink component={Link} to={`${PAGE_PATHS.ADMIN_PRODUCTS}/${row._id}/rating`}>
          {averageRating}
        </MuiLink>
      )
    }

    if (id === 'price') {
      return formatPrice(row.price)
    }

    return row[id]
  }

  const handleDeleteButtonClick = () => {
    showModal(storeFieldName)
  }

  const tableToolbar = (
    <ToolbarRoot data-highlighted={selectedItemsAmount > 0}>
      {selectedItemsAmount > 0 ? (
        <ToolbarTitle color="inherit" variant="subtitle1">
          {selectedItemsAmount} selected
        </ToolbarTitle>
      ) : (
        <ToolbarTitle variant="h6" id="tableTitle">
          {title}
        </ToolbarTitle>
      )}

      {selectedItemsAmount > 0 && (
        <Tooltip title="Delete" onClick={handleDeleteButtonClick}>
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
            indeterminate={selectedItemsAmount > 0 && selectedItemsAmount < removableRowsCount}
            checked={selectedItemsAmount > 0 && selectedItemsAmount === removableRowsCount}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
            disabled={removableRowsCount === 0}
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
                  const isItemSelected = isSelected(row._id)
                  const labelId = `enhanced-table-checkbox-${index}`
                  const isRowRemovable = 'isRemovable' in row ? row.isRemovable : true

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
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
                          disabled={!isRowRemovable}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={event => handleClick(event, row._id, isRowRemovable)}
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
        <TablePaginationPanel
          rowsPerPageOptions={[
            PAGE_LIMITS.ADMIN_LOW,
            PAGE_LIMITS.ADMIN_DEFAULT,
            PAGE_LIMITS.ADMIN_HIGH,
          ]}
          component="div"
          count={totalAmount}
          rowsPerPage={rowsPerPage}
          page={currentPage - 1}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            MenuProps: {
              MenuListProps: isDarkTheme ? { style: { backgroundColor: '#687579' } } : {},
            },
          }}
        />
      </Wrapper>
    </Root>
  )
}

Table.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  rows: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  storeFieldName: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  selectedItems: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
}

export default Table
