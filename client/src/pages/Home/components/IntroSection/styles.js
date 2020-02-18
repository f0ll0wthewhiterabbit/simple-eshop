import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const IntroWrapper = styled.section`
  background-image: url('/intro-bg.jpg');
  background-color: #839096;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 826px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.font.contrast};
`

export const Heading = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;

  span {
    color: ${props => props.theme.colors.accent};
  }

  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 60px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    font-size: 110px;
    line-height: 85px;
  }
`

export const Subheading = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  font-size: 32px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 10px;

  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 48px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    font-size: 96px;
    margin-bottom: 0;
  }
`

export const Slogan = styled.p`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.font.family};
  font-size: 18px;
  font-weight: 400;
  line-height: 1;

  ${props => props.theme.breakpoints.up('sm')} {
    font-size: 26px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    font-size: 36px;
  }
`
