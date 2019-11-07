import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button, Chip } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

import { Wrapper, ImageWrapper, Content, TagsWrapper, ActionsWrapper } from './styles'

const ProductCard = ({ title, description, tags, price, rating, imageSrc }) => {
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
        <Rating value={rating} size="small" readOnly />
        <Button size="small" color="primary" startIcon={<ShoppingCartOutlinedIcon />} disabled>
          {price} $
        </Button>
      </ActionsWrapper>
    </Wrapper>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
}

export default ProductCard
