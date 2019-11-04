import styled from 'styled-components'
import { Card, CardMedia, CardContent, CardActions } from '@material-ui/core'

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
  padding-left: 16px;
  padding-right: 16px;
`

const ActionsWrapper = styled(CardActions)`
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
`

export { Wrapper, ImageWrapper, Content, TagsWrapper, ActionsWrapper }
