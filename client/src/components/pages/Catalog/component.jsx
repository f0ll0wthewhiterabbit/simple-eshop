import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Grid, Typography } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import ProductCard from './components/ProductCard'
import Loader from '../../global/Loader'
import { Wrapper, Heading, Pagination, PaginationItem, PaginationButton } from './styles'

const CatalogPage = ({
  products,
  currentPage,
  totalAmount,
  totalPages,
  error,
  isLoading,
  fetchProducts,
}) => {
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  const pageNumbers = Array.from({ length: totalPages }, (v, k) => k + 1)
  let content

  const handlePageNumberClick = evt => {
    fetchProducts(Number(evt.target.innerText))
  }

  const handlePreviousPageClick = () => {
    fetchProducts(currentPage - 1)
  }
  const handleNextPageClick = () => {
    fetchProducts(currentPage + 1)
  }

  const isPageNumberInPagination = pageNumber => {
    return (
      pageNumber === 1 ||
      pageNumber === totalAmount ||
      (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
    )
  }

  if (error || products.size === 0) {
    content = (
      <Typography variant="body1" align="center">
        Sorry, there are no products yet
      </Typography>
    )
  } else if (isLoading) {
    content = <Loader />
  } else {
    content = (
      <>
        <Grid container spacing={4}>
          {products.map(product => {
            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <ProductCard productData={product} />
              </Grid>
            )
          })}
        </Grid>
        <Pagination>
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
        </Pagination>
      </>
    )
  }

  return (
    <Wrapper maxWidth="lg">
      <Heading variant="h4" component="h1" align="center">
        Catalog
      </Heading>
      {content}
    </Wrapper>
  )
}

CatalogPage.defaultProps = {
  error: null,
  totalAmount: null,
  totalPages: null,
  currentPage: 1,
}

CatalogPage.propTypes = {
  products: ImmutablePropTypes.listOf(
    ImmutablePropTypes.recordOf({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      tags: ImmutablePropTypes.listOf(PropTypes.string),
      rating: ImmutablePropTypes.listOf(
        ImmutablePropTypes.recordOf({
          _id: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          stars: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
  currentPage: PropTypes.number,
  totalAmount: PropTypes.number,
  totalPages: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
  isLoading: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
}

export default CatalogPage
