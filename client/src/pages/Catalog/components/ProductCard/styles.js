import styled from 'styled-components'
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@material-ui/core'

export const Wrapper = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background.productCard};
  transition: background-color 0.3s ease-in;
`
/**
 * 16:9 ratio - 56.25%
 */
export const ImageWrapper = styled(CardMedia)`
  padding-top: 56.25%;
`

export const Content = styled(CardContent)`
  flex-grow: 1;
  position: relative;
  padding-bottom: 18px;
`

export const Title = styled(Typography)`
  padding-right: 70px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.bold};
  font-weight: 700;
  text-transform: none;
  font-size: 20px;
`

export const Price = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.bold};
  font-weight: 700;
  text-transform: none;
  font-size: 16px;
  margin-bottom: 25px;
`

export const Description = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.regular};
  font-weight: 500;
  text-transform: none;
  font-size: 16px;
`

export const PurchaseButton = styled(Button)`
  font-family: ${props => props.theme.font.family};
  font-size: 13px;
  font-weight: 600;
  position: absolute;
  top: 16px;
  right: 16px;
  margin-right: 4px;
`

export const TagsWrapper = styled(CardActions)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
  flex-wrap: wrap;

  .MuiChip-root {
    margin-left: 0;
    margin-right: 6px;
    margin-bottom: 2px;
    padding: 5px 10px;
    font-family: ${props => props.theme.font.family};
    font-size: 12px;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.font.contrast};
    border-radius: 40px;
  }
`
