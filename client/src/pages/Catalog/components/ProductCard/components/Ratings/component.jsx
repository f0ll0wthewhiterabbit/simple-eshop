import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  Stars,
  RatingsRoot,
  RatingWrapper,
  RatingsCount,
  DeleteButton,
  RatingTitle,
  LoadingLabel,
  ErrorLabel,
} from './styles'

const Ratings = ({
  productData,
  changeProductRatingRequest,
  deleteProductRatingRequest,
  ratingsLoadingList,
  ratingsErrorList,
}) => {
  const { _id: id, ratingInfo } = productData
  const { average, votesAmount, currentUserRating } = ratingInfo
  const averageRating = Math.round(average)
  const isUserRatedProduct = Boolean(currentUserRating)
  const isRatingLoading = ratingsLoadingList.indexOf(id) !== -1
  const isErrorInLoad = ratingsErrorList.indexOf(id) !== -1

  const handleRatingChange = (event, userRating) => {
    changeProductRatingRequest({
      productId: id,
      userRating,
    })
  }

  const handleDeleteButtonClick = () => {
    deleteProductRatingRequest(id)
  }

  let userRatingField

  if (isErrorInLoad) {
    userRatingField = (
      <ErrorLabel variant="caption" color="secondary" data-test="ratingError">
        Something went wrong!
      </ErrorLabel>
    )
  } else if (isRatingLoading) {
    userRatingField = (
      <LoadingLabel variant="caption" data-test="ratingLoading">
        Loading...
      </LoadingLabel>
    )
  } else {
    userRatingField = (
      <>
        <Stars
          value={isUserRatedProduct ? currentUserRating : 0}
          name={`simple-controlled-user-${id}`}
          size="small"
          onChange={handleRatingChange}
          readOnly={isUserRatedProduct}
          data-test="userRating"
        />
        {isUserRatedProduct && (
          <DeleteButton
            aria-label="delete"
            size="small"
            onClick={handleDeleteButtonClick}
            data-test="deleteButton"
          >
            <DeleteIcon fontSize="inherit" />
          </DeleteButton>
        )}
      </>
    )
  }

  return (
    <RatingsRoot>
      <RatingWrapper>
        <RatingTitle>Your rating:</RatingTitle>
        {userRatingField}
      </RatingWrapper>
      <RatingWrapper>
        <RatingTitle>Average rating:</RatingTitle>
        <Stars
          value={averageRating}
          name={`simple-controlled-average-${id}`}
          onChange={handleRatingChange}
          readOnly
          size="small"
          data-test="averageRating"
        />
        <RatingsCount active data-test="ratingsCount">
          ({votesAmount})
        </RatingsCount>
      </RatingWrapper>
    </RatingsRoot>
  )
}

Ratings.propTypes = {
  productData: ImmutablePropTypes.recordOf({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tags: ImmutablePropTypes.listOf(PropTypes.string),
    ratingInfo: ImmutablePropTypes.recordOf({
      average: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.oneOf([null]).isRequired,
      ]),
      votesAmount: PropTypes.number.isRequired,
      currentUserRating: PropTypes.number,
    }),
  }).isRequired,
  changeProductRatingRequest: PropTypes.func.isRequired,
  deleteProductRatingRequest: PropTypes.func.isRequired,
  ratingsLoadingList: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  ratingsErrorList: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
}

export default Ratings
