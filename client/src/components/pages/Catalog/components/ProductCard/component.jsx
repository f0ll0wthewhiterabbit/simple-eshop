import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Typography, Chip } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

import formatPrice from '../../../../../utils/formatPrice'
import { API_URL } from '../../../../../constants'
import {
  Wrapper,
  ImageWrapper,
  Content,
  Title,
  PriceButton,
  TagsWrapper,
  Stars,
  RaitingsRoot,
  RaitingWrapper,
  RaitingsCount,
  DeleteButton,
  RatingTitle,
  LoadingLabel,
  ErrorLabel,
} from './styles'

const ProductCard = ({
  productData,
  changeProductRating,
  deleteProductRating,
  ratingsLoadingList,
  ratingsErrorList,
}) => {
  const { _id: id, title, description, tags, price, ratingInfo, imageName } = productData
  const { average, votesAmount, currentUserRating } = ratingInfo
  const averageRating = Math.round(average)
  const isUserRatedProduct = Boolean(currentUserRating)
  const isRatingLoading = ratingsLoadingList.indexOf(id) !== -1
  const isErrorInLoad = ratingsErrorList.indexOf(id) !== -1

  const handleRatingChange = (event, userRating) => {
    changeProductRating({
      productId: id,
      userRating,
    })
  }

  const handleDeleteButtonClick = () => {
    deleteProductRating(id)
  }

  let userRatingField

  if (isErrorInLoad) {
    userRatingField = (
      <ErrorLabel variant="caption" color="secondary">
        Something went wrong!
      </ErrorLabel>
    )
  } else if (isRatingLoading) {
    userRatingField = <LoadingLabel variant="caption">Loading...</LoadingLabel>
  } else {
    userRatingField = (
      <>
        <Stars
          value={isUserRatedProduct ? currentUserRating : 0}
          name={`simple-controlled-user-${id}`}
          size="small"
          onChange={handleRatingChange}
          readOnly={isUserRatedProduct}
        />
        {isUserRatedProduct && (
          <DeleteButton aria-label="delete" size="small" onClick={handleDeleteButtonClick}>
            <DeleteIcon fontSize="inherit" />
          </DeleteButton>
        )}
      </>
    )
  }

  return (
    <Wrapper>
      <ImageWrapper image={`${API_URL}/products/${id}/${imageName}`} title={title} />
      <Content>
        <Title gutterBottom variant="h5" component="h2">
          {title}
        </Title>
        <PriceButton size="small" color="primary" startIcon={<ShoppingCartOutlinedIcon />} disabled>
          {formatPrice(price)}
        </PriceButton>
        <Typography>{description}</Typography>
      </Content>
      <TagsWrapper>
        {tags.map(tag => (
          <Chip key={tag} label={tag} color="secondary" size="small" />
        ))}
      </TagsWrapper>
      <RaitingsRoot>
        <RaitingWrapper>
          <RatingTitle>Your rating:</RatingTitle>
          {userRatingField}
        </RaitingWrapper>
        <RaitingWrapper>
          <RatingTitle>Average rating:</RatingTitle>
          <Stars
            value={averageRating}
            name={`simple-controlled-average-${id}`}
            onChange={handleRatingChange}
            readOnly
            size="small"
          />
          <RaitingsCount active>({votesAmount})</RaitingsCount>
        </RaitingWrapper>
      </RaitingsRoot>
    </Wrapper>
  )
}

ProductCard.propTypes = {
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
  changeProductRating: PropTypes.func.isRequired,
  deleteProductRating: PropTypes.func.isRequired,
  ratingsLoadingList: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  ratingsErrorList: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
}

export default ProductCard
