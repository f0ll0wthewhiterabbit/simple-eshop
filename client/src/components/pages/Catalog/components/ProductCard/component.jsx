import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Chip } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import Immutable from 'immutable'

import formatPrice from '../../../../../utils/formatPrice'
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
  currentUserId,
  changeProductRating,
  deleteProductRating,
  ratingsLoadingList,
  ratingsErrorList,
}) => {
  const id = productData.get('_id')
  const title = productData.get('title')
  const description = productData.get('description')
  const tags = productData.get('tags')
  const price = productData.get('price')
  const rating = productData.get('rating')
  const imageSrc = productData.get('image')
  const ratingsAmount = rating.size
  const averageRating = Math.round(rating.reduce((a, b) => a + b.stars, 0) / ratingsAmount)
  const currentUserRating = rating.find(it => it.get('userId') === currentUserId)
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
          value={isUserRatedProduct ? currentUserRating.get('stars') : 0}
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
      <ImageWrapper image={imageSrc} title={title} />
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
          <RaitingsCount active>({ratingsAmount})</RaitingsCount>
        </RaitingWrapper>
      </RaitingsRoot>
    </Wrapper>
  )
}

ProductCard.defaultProps = {
  currentUserId: '',
}

ProductCard.propTypes = {
  productData: PropTypes.instanceOf(Immutable.Map).isRequired,
  currentUserId: PropTypes.string,
  changeProductRating: PropTypes.func.isRequired,
  deleteProductRating: PropTypes.func.isRequired,
  ratingsLoadingList: PropTypes.instanceOf(Immutable.List).isRequired,
  ratingsErrorList: PropTypes.instanceOf(Immutable.List).isRequired,
}

export default ProductCard
