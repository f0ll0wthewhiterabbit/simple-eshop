import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button, Chip } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CancelIcon from '@material-ui/icons/Cancel'

import {
  Wrapper,
  ImageWrapper,
  Content,
  TagsWrapper,
  ActionsWrapper,
  Stars,
  RaitingWrapper,
  RaitingsCount,
  DeleteButton,
  RatingCount,
} from './styles'

const ProductCard = ({
  id,
  title,
  description,
  tags,
  price,
  rating,
  imageSrc,
  currentUserId,
  changeProductRating,
  deleteProductRating,
}) => {
  const ratingsAmount = rating.length
  const averageRating = Math.round(rating.reduce((a, b) => a + b.stars, 0) / ratingsAmount)
  const currentUserRating = rating.find(it => it.userId === currentUserId)
  const isUserRatedProduct = Boolean(currentUserRating)

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
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Content>
      <TagsWrapper>
        {tags.map(tag => (
          <Chip key={tag} label={tag} color="secondary" size="small" />
        ))}
      </TagsWrapper>
      <ActionsWrapper>
        <RaitingWrapper>
          {isUserRatedProduct && <RatingCount>Your rating: {currentUserRating.stars}</RatingCount>}
          <Stars
            value={averageRating}
            name={`simple-controlled-${id}`}
            size="small"
            onChange={handleRatingChange}
          />{' '}
          <RaitingsCount data-color={isUserRatedProduct ? '#f50057' : '#bdbdbd'} active>
            ({ratingsAmount})
          </RaitingsCount>
          {isUserRatedProduct && (
            <DeleteButton aria-label="delete" size="small" onClick={handleDeleteButtonClick}>
              <CancelIcon fontSize="inherit" />
            </DeleteButton>
          )}
        </RaitingWrapper>
        <Button size="small" color="primary" startIcon={<ShoppingCartOutlinedIcon />} disabled>
          {price} $
        </Button>
      </ActionsWrapper>
    </Wrapper>
  )
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      stars: PropTypes.number.isRequired,
    })
  ).isRequired,
  imageSrc: PropTypes.string.isRequired,
  currentUserId: PropTypes.number.isRequired,
  changeProductRating: PropTypes.func.isRequired,
  deleteProductRating: PropTypes.func.isRequired,
}

export default ProductCard
