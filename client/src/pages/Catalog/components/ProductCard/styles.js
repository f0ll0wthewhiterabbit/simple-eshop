import styled from 'styled-components'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

export const Wrapper = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
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
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-weight: 700;
  text-transform: none;
  font-size: 20px;
`

export const Price = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #1e1e1e;
  font-weight: 700;
  text-transform: none;
  font-size: 16px;
  margin-bottom: 25px;
`

export const Description = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #727272;
  font-weight: 500;
  text-transform: none;
  font-size: 16px;
`

export const PurchaseButton = styled(Button)`
  font-family: 'Montserrat', sans-serif;
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
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    background: #b0bcc2;
    color: #fff;
    border-radius: 40px;
  }
`

export const RaitingsRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(2, 2)};
`

export const RaitingWrapper = styled(CardActions)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  width: 50%;
  min-height: 42px;
  position: relative;
`

export const Stars = styled(Rating)`
  min-height: 18px;

  && {
    margin-left: 0;
  }
`

export const RaitingsCount = styled.span`
  margin-left: 6px;
  font-family: 'Montserrat', sans-serif;
  color: #bdbdbd;
  font-weight: 500;
  font-size: 12px;
`

export const DeleteButton = styled(IconButton)`
  color: rgba(0, 0, 0, 0.26);
  position: absolute;
  top: 19px;
  left: 87px;

  && {
    margin-left: 3px;
  }

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`

export const RatingTitle = styled.span`
  width: 100%;
  margin-left: 2px;
  font-family: 'Montserrat', sans-serif;
  color: #bdbdbd;
  font-weight: 500;
  font-size: 12px;
`

export const LoadingLabel = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  color: #bdbdbd;
  font-weight: 500;
  font-size: 12px;
  margin-left: 2px;
`

export const ErrorLabel = styled(Typography)`
  margin-left: 2px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 12px;
`
