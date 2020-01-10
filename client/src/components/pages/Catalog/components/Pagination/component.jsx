import React from 'react'
import PropTypes from 'prop-types'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { PaginationList, PaginationItem, PaginationButton } from './styles'

const Pagination = ({ currentPage, totalPages, filter, fetchProducts }) => {
  const pageNumbers = Array.from({ length: totalPages }, (v, k) => k + 1)

  const handlePageNumberClick = evt => {
    fetchProducts(Number(evt.target.innerText), null, filter)
  }

  const handlePreviousPageClick = () => {
    fetchProducts(currentPage - 1, null, filter)
  }
  const handleNextPageClick = () => {
    fetchProducts(currentPage + 1, null, filter)
  }

  const isPageNumberInPagination = pageNumber => {
    return (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
    )
  }

  return (
    <PaginationList>
      <PaginationItem>
        <PaginationButton
          aria-label="delete"
          size="small"
          disabled={currentPage === 1 ? true : undefined}
          onClick={handlePreviousPageClick}
        >
          <ChevronLeftIcon />
        </PaginationButton>
      </PaginationItem>
      {pageNumbers.map(
        pageNumber =>
          isPageNumberInPagination(pageNumber) && (
            <PaginationItem key={pageNumber}>
              <PaginationButton
                type="button"
                active={pageNumber === currentPage ? 1 : undefined}
                onClick={pageNumber === currentPage ? undefined : handlePageNumberClick}
              >
                {pageNumber}
              </PaginationButton>
            </PaginationItem>
          )
      )}
      <PaginationItem>
        <PaginationButton
          aria-label="delete"
          size="small"
          disabled={currentPage === totalPages ? true : undefined}
          onClick={handleNextPageClick}
        >
          <ChevronRightIcon />
        </PaginationButton>
      </PaginationItem>
    </PaginationList>
  )
}

Pagination.defaultProps = {
  totalPages: null,
  currentPage: 1,
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  filter: PropTypes.string.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default Pagination
