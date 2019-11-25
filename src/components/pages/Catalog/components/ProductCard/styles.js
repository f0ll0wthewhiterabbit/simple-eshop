import styled from 'styled-components'
import { Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core'
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
`

const TagsWrapper = styled(CardActions)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
`

const ActionsWrapper = styled(CardActions)`
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;
  padding-top: 12px;
  justify-content: space-between;
`

const Stars = styled(Rating)`
  margin-right: 4px;
`

const RaitingWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const RaitingsCount = styled.span`
  color: ${props => props['data-color']};
  font-size: 13px;
  margin-right: 2px;
`

const DeleteButton = styled(IconButton)`
  color: rgba(0, 0, 0, 0.26);
  margin-right: 5px;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`

const RatingCount = styled.span`
  color: #bdbdbd;
  font-size: 13px;
  position: absolute;
  top: -16px;
  left: 3px;
`

export {
  Wrapper,
  ImageWrapper,
  Content,
  TagsWrapper,
  ActionsWrapper,
  Stars,
  RaitingWrapper,
  RaitingsCount,
  DeleteButton,
  RatingCount,
}
