import styled from 'styled-components'
import { Typography, Container } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { Link } from 'react-router-dom'

export const Wrapper = styled.footer`
  margin-top: auto;
  position: relative;
  z-index: 2;
  background-color: #262626;
`

export const Info = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #7b7b7b;
  font-weight: 400;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing(1)}px;
`
export const Copyright = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #7b7b7b;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
`

export const SiteLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: #fff;
  }
`

export const InfoWrapper = styled(Container)`
  padding-top: ${props => props.theme.spacing(10)}px;
  padding-bottom: ${props => props.theme.spacing(10)}px;
`

export const SocialLinksWrapper = styled.section`
  background: #222121;
`

export const SocialLinksContainer = styled(Container)`
  padding-top: ${props => props.theme.spacing(6)}px;
  padding-bottom: ${props => props.theme.spacing(6)}px;
`

export const InfoHeading = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #fff;
  font-size: 26px;
  margin-bottom: 44px;
  text-align: center;

  ${props => props.theme.breakpoints.up('md')} {
    text-align: left;
  }
`

export const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;

  ${props => props.theme.breakpoints.up('md')} {
    text-align: left;
  }
`

export const InfoItem = styled.li`
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  opacity: 0.5;
`

export const SocialLinksList = styled.ul`
  margin: ${props => props.theme.spacing(0, 0, 5)};
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;
`

export const SocialLinksItem = styled.li`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.theme.breakpoints.up('md')} {
    margin-right: 88px;
  }
`

export const SocialLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;

  .social-links__title {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    color: #9f9fa0;
    transition: all 0.3s;
    display: none;

    ${props => props.theme.breakpoints.up('md')} {
      display: inline;
    }
  }

  &:hover {
    .social-links__title {
      color: #fff;
    }

    .instagram {
      color: #2f5d84;
    }

    .twitter {
      color: #5abed6;
    }

    .youtube {
      color: #d12227;
    }

    .facebook {
      color: #39599f;
    }
  }
`

export const SocialIconInstagram = styled(InstagramIcon)`
  font-size: 30px;
  color: #d7d7d7;
  margin-right: 19px;
`

export const SocialIconTwitter = styled(TwitterIcon)`
  font-size: 30px;
  color: #d7d7d7;
  margin-right: 19px;
`

export const SocialIconYoutube = styled(YouTubeIcon)`
  font-size: 30px;
  color: #d7d7d7;
  margin-right: 19px;
`

export const SocialIconFacebook = styled(FacebookIcon)`
  font-size: 30px;
  color: #d7d7d7;
  margin-right: 0;

  && {
    ${props => props.theme.breakpoints.up('md')} {
      margin-right: 19px;
    }
  }
`

export const FooterLink = styled.a`
  color: #007bff;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: #fff;
  }
`
