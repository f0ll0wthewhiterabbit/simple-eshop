import React from 'react'

import { HOME_PAGE_PATH } from '../../../constants'
import {
  Wrapper,
  Info,
  SiteLink,
  SocialLinksWrapper,
  SocialLinksContainer,
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

const Footer = () => {
  return (
    <Wrapper>
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
            <SiteLink to={HOME_PAGE_PATH}>simple eShop</SiteLink> {new Date().getFullYear()}
          </Copyright>
        </SocialLinksContainer>
      </SocialLinksWrapper>
    </Wrapper>
  )
}

export default Footer
