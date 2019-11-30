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
`

export const Title = styled(Typography)`
  padding-right: ${props => props.theme.spacing(10)}px;
`

export const PriceButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`

export const TagsWrapper = styled(CardActions)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
`

export const RaitingsRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(1, 2, 2)};
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
  margin-left: 0;
  min-height: 18px;
`

export const RaitingsCount = styled.span`
  color: #bdbdbd;
  font-size: 13px;
  margin-left: 2px;
`

export const DeleteButton = styled(IconButton)`
  color: rgba(0, 0, 0, 0.26);
  margin-left: 3px;
  position: absolute;
  top: 20px;
  left: 87px;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`

export const RatingTitle = styled.span`
  color: #bdbdbd;
  font-size: 13px;
  width: 100%;
  margin-left: 2px;
`
