import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Chip } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

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
} from './styles'

const ProductCard = ({ productData, currentUserId, changeProductRating, deleteProductRating }) => {
  const { _id: id, title, description, tags, price, rating, image: imageSrc } = productData
  const ratingsAmount = rating.length
  const averageRating = Math.round(rating.reduce((a, b) => a + b.stars, 0) / ratingsAmount)
  const currentUserRating = rating.find(it => it.userId === currentUserId)
  const isUserRatedProduct = Boolean(currentUserRating) && currentUserRating.stars > 0

  const handleRatingChange = (event, userRating) => {
    changeProductRating({
      productId: id,
      userRating,
    })
  }

  const handleDeleteButtonClick = () => {
    deleteProductRating(id)
  }

  return (
    <Wrapper>
      <ImageWrapper image={imageSrc} title={title} />
      <Content>
        <Title gutterBottom variant="h5" component="h2">
          {title}
        </Title>
        <PriceButton size="small" color="primary" startIcon={<ShoppingCartOutlinedIcon />} disabled>
          {price} $
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
          <Stars
            value={isUserRatedProduct ? currentUserRating.stars : 0}
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
  productData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.string.isRequired,
        stars: PropTypes.number.isRequired,
      })
    ).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  currentUserId: PropTypes.string,
  changeProductRating: PropTypes.func.isRequired,
  deleteProductRating: PropTypes.func.isRequired,
}

export default ProductCard
