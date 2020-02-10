import React from 'react'

import {
  Wrapper,
  InfoList,
  InfoItem,
  InfoText,
  ShippingIcon,
  StudentIcon,
  MoneyIcon,
} from './styles'

const InfoSection = () => {
  return (
    <Wrapper>
      <InfoList>
        <InfoItem>
          <ShippingIcon />
          <InfoText>Free shipping on orders over $30</InfoText>
        </InfoItem>
        <InfoItem>
          <StudentIcon />
          <InfoText>20% Student Discount</InfoText>
        </InfoItem>
        <InfoItem>
          <MoneyIcon />
          <InfoText>30% off on dresses. Use code: 30OFF</InfoText>
        </InfoItem>
      </InfoList>
    </Wrapper>
  )
}

export default InfoSection
