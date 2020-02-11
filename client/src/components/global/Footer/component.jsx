import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH } from '../../../constants'
import {
  Wrapper,
  Info,
  SiteLink,
  SocialLinksWrapper,
  SocialLinksContainer,
  InfoWrapper,
  InfoHeading,
  InfoList,
  InfoItem,
  SocialLinksList,
  SocialLinksItem,
  SocialLink,
  SocialIconInstagram,
  SocialIconFacebook,
  SocialIconTwitter,
  SocialIconYoutube,
  FooterLink,
  Copyright,
} from './styles'

const Footer = ({ isAdmin, isAuthenticated }) => {
  return (
    <Wrapper>
      {!isAdmin && isAuthenticated && (
        <InfoWrapper maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <InfoHeading variant="h4">About Us</InfoHeading>
              <InfoList>
                <InfoItem>About Us</InfoItem>
                <InfoItem>Community</InfoItem>
                <InfoItem>Jobs</InfoItem>
                <InfoItem>Shipping</InfoItem>
                <InfoItem>Contact Us</InfoItem>
              </InfoList>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoHeading variant="h4">Customer Care</InfoHeading>
              <InfoList>
                <InfoItem>Search</InfoItem>
                <InfoItem>Privacy Policy</InfoItem>
                <InfoItem>2019 Lookbook</InfoItem>
                <InfoItem>Shipping &amp; Delivery</InfoItem>
                <InfoItem>Gallery</InfoItem>
              </InfoList>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoHeading variant="h4">Our Services</InfoHeading>
              <InfoList>
                <InfoItem>Free Shipping</InfoItem>
                <InfoItem>Free Returnes</InfoItem>
                <InfoItem>Our Franchising</InfoItem>
                <InfoItem>Terms and conditions</InfoItem>
                <InfoItem>Privacy Policy</InfoItem>
              </InfoList>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <InfoHeading variant="h4">Information</InfoHeading>
              <InfoList>
                <InfoItem>Payment methods</InfoItem>
                <InfoItem>Times and shipping costs</InfoItem>
                <InfoItem>Product Returns</InfoItem>
                <InfoItem>Shipping methods</InfoItem>
                <InfoItem>Conformity of the products</InfoItem>
              </InfoList>
            </Grid>
          </Grid>
        </InfoWrapper>
      )}

      <SocialLinksWrapper>
        <SocialLinksContainer maxWidth="lg">
          <SocialLinksList>
            <SocialLinksItem>
              <SocialLink href="https://www.instagram.com/itechart_official">
                <SocialIconInstagram className="instagram" />
                <span className="social-links__title">Instagram</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://twitter.com/itechart">
                <SocialIconTwitter className="twitter" />
                <span className="social-links__title">Twitter</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://www.youtube.com/user/iTechArt">
                <SocialIconYoutube className="youtube" />
                <span className="social-links__title">Youtube</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://www.facebook.com/iTechArt.Group">
                <SocialIconFacebook className="facebook" />
                <span className="social-links__title">Facebook</span>
              </SocialLink>
            </SocialLinksItem>
          </SocialLinksList>

          <Info variant="subtitle1" color="textSecondary" align="center" component="p">
            <FooterLink color="inherit" href="https://www.itechart.by/">
              iTechArt
            </FooterLink>
            &nbsp;Students Lab Vitebsk
          </Info>

          <Copyright>
            {'© '}
            <SiteLink to={MAIN_PAGE_PATH}>simple eShop</SiteLink> {new Date().getFullYear()}
          </Copyright>
        </SocialLinksContainer>
      </SocialLinksWrapper>
    </Wrapper>
  )
}

Footer.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Footer
