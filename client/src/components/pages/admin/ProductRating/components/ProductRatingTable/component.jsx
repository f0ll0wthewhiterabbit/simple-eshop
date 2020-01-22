import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'

import {
  ADMIN_LOW_PER_PAGE_LIMIT,
  DEFAULT_ADMIN_PER_PAGE_LIMIT,
  ADMIN_HIGH_PER_PAGE_LIMIT,
} from '../../../../../../constants'
import {
  Root,
  Wrapper,
  TableWrapper,
  TableRoot,
  ToolbarRoot,
  ToolbarTitleWrapper,
  Heading,
  SubHeading,
  Comment,
  TablePaginationPanel,
} from './styles'

const ProductRatingTable = ({
  productData,
  itemsPerPage,
  currentPage,
  totalAmount,
  setProductsPerPage,
  fetchProductRating,
}) => {
  const [page, setPage] = React.useState(0)

  const { id: productId, title, rating: ratingList } = productData
  const headCells = [
    { id: 'firstName', label: 'First Name', isNumeric: false },
    { id: 'lastName', label: 'Last Name', isNumeric: false },
    { id: 'email', label: 'Email', isNumeric: false },
    { id: 'rating', label: 'Rating', isNumeric: true },
  ]

  const handleChangePage = (event, newPage) => {
    const term = currentPage === newPage ? 1 : -1

    fetchProductRating(productId, currentPage + term, itemsPerPage)
    setPage(newPage)
  }

  const handleChangeItemsPerPage = event => {
    setProductsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const mapRowToTableCellContent = (id, row) => {
    if (id === 'firstName') {
      return row.user ? row.user.firstName : '--'
    }

    if (id === 'lastName') {
      return row.user ? row.user.lastName : '--'
    }

    if (id === 'email') {
      return row.user ? row.user.email : '--'
    }

    if (id === 'rating') {
      return row.stars
    }

    return row[id]
  }

  const tableToolbar = (
    <ToolbarRoot>
      <ToolbarTitleWrapper>
        <Heading variant="h5" id="tableTitle">
          Rating
        </Heading>
        <SubHeading variant="h6" gutterBottom>
          {title}
        </SubHeading>
      </ToolbarTitleWrapper>
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
              {ratingList
                .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
                .map(row => {
                  return (
                    <TableRow hover tabIndex={-1} key={row._id}>
                      {headCells.map(headCell => (
                        <TableCell key={headCell.id} align={headCell.isNumeric ? 'center' : 'left'}>
                          {mapRowToTableCellContent(headCell.id, row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
            </TableBody>
          </TableRoot>
        </TableWrapper>
        <Comment variant="caption">&quot;--&quot; - for deleted users</Comment>
        <TablePaginationPanel
          rowsPerPageOptions={[
            ADMIN_LOW_PER_PAGE_LIMIT,
            DEFAULT_ADMIN_PER_PAGE_LIMIT,
            ADMIN_HIGH_PER_PAGE_LIMIT,
          ]}
          component="div"
          count={totalAmount}
          rowsPerPage={itemsPerPage}
          page={currentPage - 1}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeItemsPerPage}
        />
      </Wrapper>
    </Root>
  )
}

ProductRatingTable.propTypes = {
  productData: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rating: ImmutablePropTypes.listOf(
      ImmutablePropTypes.recordOf({
        _id: PropTypes.string.isRequired,
        user: PropTypes.oneOfType([
          ImmutablePropTypes.recordOf({
            _id: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
          }).isRequired,
          PropTypes.oneOf([null]).isRequired,
        ]),
        stars: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  fetchProductRating: PropTypes.func.isRequired,
  setProductsPerPage: PropTypes.func.isRequired,
}

export default ProductRatingTable
