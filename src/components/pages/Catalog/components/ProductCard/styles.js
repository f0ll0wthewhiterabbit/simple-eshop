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

const Wrapper = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`
/**
 * 16:9 ratio - 56.25%
 */
const ImageWrapper = styled(CardMedia)`
  padding-top: 56.25%;
`

const Content = styled(CardContent)`
  flex-grow: 1;
  position: relative;
`

const Title = styled(Typography)`
  padding-right: ${props => props.theme.spacing(10)}px;
`

const PriceButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
`

const TagsWrapper = styled(CardActions)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
`

const RaitingsRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(1, 2, 2)};
`

const RaitingWrapper = styled(CardActions)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  width: 50%;
  min-height: 42px;
  position: relative;
`

const Stars = styled(Rating)`
  margin-left: 0;
  min-height: 18px;
`

const RaitingsCount = styled.span`
  color: #bdbdbd;
  font-size: 13px;
  margin-left: 2px;
`

const DeleteButton = styled(IconButton)`
  color: rgba(0, 0, 0, 0.26);
  margin-left: 3px;
  position: absolute;
  top: 20px;
  left: 87px;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`

const RatingTitle = styled.span`
  color: #bdbdbd;
  font-size: 13px;
  width: 100%;
  margin-left: 2px;
`

export {
  Wrapper,
  ImageWrapper,
  Content,
  Title,
  PriceButton,
  TagsWrapper,
  Stars,
  RaitingsRoot,
  RaitingWrapper,
  RaitingsCount,
  DeleteButton,
  RatingTitle,
}
