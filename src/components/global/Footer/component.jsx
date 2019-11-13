import React from 'react'
import { Container, Typography, Link } from '@material-ui/core'

import { MAIN_PAGE_PATH } from '../../../constants'
import { Wrapper, Info, Logo, SiteLink } from './styles'

const Footer = () => {
  const copyright = (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <SiteLink to={MAIN_PAGE_PATH}>simple eShop</SiteLink> {new Date().getFullYear()}
    </Typography>
  )

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <Info variant="subtitle1" color="textSecondary" align="center" component="p">
          <Link color="inherit" href="https://www.itechart.by/">
            <Logo src="/itechart-logo.png" alt="iTechArt" />
          </Link>
          Students Lab Vitebsk
        </Info>
        {copyright}
      </Container>
    </Wrapper>
  )
}

export default Footer
