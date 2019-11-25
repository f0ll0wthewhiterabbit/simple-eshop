import styled from 'styled-components'
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core'
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
  justify-content: space-between;
`

const Stars = styled(Rating)`
  margin-right: 5px;
`

const RaitingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RaitingsCount = styled.span`
  color: ${props => props['data-color']};
  font-size: 13px;
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
}
