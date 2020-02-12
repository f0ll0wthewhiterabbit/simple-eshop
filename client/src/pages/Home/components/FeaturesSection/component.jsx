import React from 'react'
import { Grid, Container } from '@material-ui/core'
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined'
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'

import { FeatureWrapper, FeatureHeading, FeatureDescription } from './styles'

const FeturesSection = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FeatureWrapper>
            <LocalShippingOutlinedIcon />
            <FeatureHeading variant="h4">Free shipping</FeatureHeading>
            <FeatureDescription variant="body1">
              You do not need to think about how to pick up the goods. We provide fast and free
              delivery throughout the country.
            </FeatureDescription>
          </FeatureWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureWrapper>
            <MonetizationOnOutlinedIcon />
            <FeatureHeading variant="h4">100% Money back</FeatureHeading>
            <FeatureDescription variant="body1">
              Participate in promotions and invite your friends to save up to 100% on goods
            </FeatureDescription>
          </FeatureWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureWrapper>
            <ForumOutlinedIcon />
            <FeatureHeading variant="h4">Online support 24/7</FeatureHeading>
            <FeatureDescription variant="body1">
              Our responsive and polite staff will assist at any time convenient for you. Go to the
              contact page to ask questions
            </FeatureDescription>
          </FeatureWrapper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeturesSection
