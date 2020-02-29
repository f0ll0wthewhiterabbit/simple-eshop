import React from 'react'

import { PAGE_PATHS } from '../../../constants'
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
              <SocialLink href="https://www.instagram.com/itechart_official" target="_blank">
                <SocialIconInstagram className="instagram" />
                <span className="social-links__title">Instagram</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://twitter.com/itechart" target="_blank">
                <SocialIconTwitter className="twitter" />
                <span className="social-links__title">Twitter</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://www.youtube.com/user/iTechArt" target="_blank">
                <SocialIconYoutube className="youtube" />
                <span className="social-links__title">Youtube</span>
              </SocialLink>
            </SocialLinksItem>
            <SocialLinksItem>
              <SocialLink href="https://www.facebook.com/iTechArt.Group" target="_blank">
                <SocialIconFacebook className="facebook" />
                <span className="social-links__title">Facebook</span>
              </SocialLink>
            </SocialLinksItem>
          </SocialLinksList>

          <Info variant="subtitle1" color="textSecondary" align="center" component="p">
            <FooterLink color="inherit" href="https://www.itechart.by/" target="_blank">
              iTechArt
            </FooterLink>
            &nbsp;Students Lab Vitebsk
          </Info>

          <Copyright>
            {'© '}
            <SiteLink to={PAGE_PATHS.HOME}>simple eShop</SiteLink> {new Date().getFullYear()}
          </Copyright>
        </SocialLinksContainer>
      </SocialLinksWrapper>
    </Wrapper>
  )
}

export default Footer
