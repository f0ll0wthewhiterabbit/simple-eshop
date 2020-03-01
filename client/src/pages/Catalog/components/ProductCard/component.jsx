import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Chip } from '@material-ui/core'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'

import Ratings from './components/Ratings'
import formatPrice from '../../../../utils/formatPrice'
import { BASE_URL } from '../../../../utils/api'
import {
  Wrapper,
  ImageWrapper,
  Content,
  Title,
  PurchaseButton,
  TagsWrapper,
  Price,
  Description,
} from './styles'

const ProductCard = ({ productData }) => {
  const { _id: id, title, description, tags, price, imageName } = productData

  return (
    <Wrapper>
      <ImageWrapper image={`${BASE_URL}/products/${id}/${imageName}`} title={title} />
      <Content>
        <Title gutterBottom variant="h5" component="h2" data-test="title">
          {title}
        </Title>
        <Price gutterBottom variant="h5" component="h3">
          {formatPrice(price)}
        </Price>
        <PurchaseButton size="small" color="secondary" startIcon={<ShoppingCartOutlinedIcon />}>
          Buy
        </PurchaseButton>
        <Description data-test="description">{description}</Description>
      </Content>
      <TagsWrapper>
        {tags.map(tag => (
          <Chip key={tag} label={tag} color="secondary" size="small" data-test="tag" />
        ))}
      </TagsWrapper>
      <Ratings productData={productData} />
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
}

export default ProductCard
