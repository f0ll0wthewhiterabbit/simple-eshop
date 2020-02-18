import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const FeatureWrapper = styled.div`
  text-align: center;
  padding-top: 45px;
  padding-bottom: 10px;

  svg {
    color: ${props => props.theme.colors.font.extraLight};
    font-size: 75px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    padding-top: 80px;
    padding-bottom: 90px;
  }
`

export const FeatureHeading = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.bold};
  font-size: 22px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 15px;
`

export const FeatureDescription = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.regular};
  font-size: 14px;
  line-height: 27px;
  font-weight: 500;
`
