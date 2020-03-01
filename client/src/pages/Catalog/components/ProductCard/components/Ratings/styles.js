import styled from 'styled-components'
import { CardActions, IconButton, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

export const RatingsRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(2, 2)};
`

export const RatingWrapper = styled(CardActions)`
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

  .MuiRating-iconEmpty {
    color: ${props => props.theme.colors.font.light};
  }

  && {
    margin-left: 0;
  }
`

export const RatingsCount = styled.span`
  margin-left: 6px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.light};
  font-weight: 500;
  font-size: 12px;
`

export const DeleteButton = styled(IconButton)`
  color: ${props => props.theme.colors.font.light};
  position: absolute;
  top: 19px;
  left: 87px;

  && {
    margin-left: 3px;
  }

  &:hover {
    color: ${props => props.theme.colors.font.regular};
  }
`

export const RatingTitle = styled.span`
  width: 100%;
  margin-left: 2px;
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.light};
  font-weight: 500;
  font-size: 12px;
`

export const LoadingLabel = styled(Typography)`
  font-family: ${props => props.theme.font.family};
  color: ${props => props.theme.colors.font.light};
  font-weight: 500;
  font-size: 12px;
  margin-left: 2px;
`

export const ErrorLabel = styled(Typography)`
  margin-left: 2px;
  font-family: ${props => props.theme.font.family};
  font-weight: 500;
  font-size: 12px;
`
