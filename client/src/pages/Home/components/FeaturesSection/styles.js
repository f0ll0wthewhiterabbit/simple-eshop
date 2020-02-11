import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const FeatureWrapper = styled.div`
  text-align: center;
  padding-top: 45px;
  padding-bottom: 10px;

  svg {
    color: #dfe2e3;
    font-size: 75px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    padding-top: 80px;
    padding-bottom: 90px;
  }
`

export const FeatureHeading = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-size: 22px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 15px;
`

export const FeatureDescription = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #727272;
  font-size: 14px;
  line-height: 27px;
  font-weight: 500;
`
