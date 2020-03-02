import React from 'react'
import PropTypes from 'prop-types'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { Wrapper, PaginationList, PaginationItem, PaginationButton, Label } from './styles'

const Pagination = ({
  currentPage,
  totalPages,
  totalAmount,
  filter,
  withLabel,
  withNumbers,
  fetchProductsRequest,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (v, k) => k + 1)

  const handlePageNumberClick = event => {
    fetchProductsRequest(Number(event.target.innerText), { filter })
  }

  const handlePreviousPageClick = () => {
    fetchProductsRequest(currentPage - 1, { filter })
  }
  const handleNextPageClick = () => {
    fetchProductsRequest(currentPage + 1, { filter })
  }

  const isPageNumberInPagination = pageNumber => {
    if (!withNumbers) {
      return pageNumber === currentPage
    }

    return (
      pageNumber === 1 ||
      pageNumber === totalPages ||
      (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
    )
  }

  return (
    <Wrapper>
      {withLabel && <Label>{totalAmount} Products</Label>}
      <PaginationList>
        <PaginationItem>
          <PaginationButton
            aria-label="previous"
            size="small"
            disabled={currentPage === 1 ? true : undefined}
            onClick={handlePreviousPageClick}
            data-test="previousButton"
          >
            <ChevronLeftIcon />
          </PaginationButton>
        </PaginationItem>
        {pageNumbers.map(
          pageNumber =>
            isPageNumberInPagination(pageNumber) && (
              <PaginationItem key={pageNumber} data-test="paginationItem">
                <PaginationButton
                  type="button"
                  active={pageNumber === currentPage ? 1 : undefined}
                  onClick={pageNumber === currentPage ? undefined : handlePageNumberClick}
                  data-test={`paginationButton${pageNumber}`}
                >
                  {pageNumber}
                </PaginationButton>
              </PaginationItem>
            )
        )}
        <PaginationItem>
          <PaginationButton
            aria-label="next"
            size="small"
            disabled={currentPage === totalPages ? true : undefined}
            onClick={handleNextPageClick}
            data-test="nextButton"
          >
            <ChevronRightIcon />
          </PaginationButton>
        </PaginationItem>
      </PaginationList>
    </Wrapper>
  )
}

Pagination.defaultProps = {
  totalPages: null,
  currentPage: 1,
  withLabel: false,
  withNumbers: true,
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalAmount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  withLabel: PropTypes.bool,
  withNumbers: PropTypes.bool,
  fetchProductsRequest: PropTypes.func.isRequired,
}

export default Pagination
