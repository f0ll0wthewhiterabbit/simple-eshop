import styled from 'styled-components'
import { List, ListItemIcon, ListItemText } from '@material-ui/core'
import blueGrey from '@material-ui/core/colors/blueGrey'

const PagesList = styled(List)`
  padding-top: ${props => props.theme.spacing(2)}px;
  padding-bottom: ${props => props.theme.spacing(2)}px;
`

const PageIcon = styled(ListItemIcon)`
  color: ${blueGrey[800]};
  min-width: ${props => props.theme.spacing(5)}px;
`

const PageText = styled(ListItemText)`
  color: ${blueGrey[800]};

  .MuiListItemText-primary {
    font-weight: ${props => props.theme.typography.fontWeightMedium};
    font-size: 0.875rem;
  }
`

export { PagesList, PageIcon, PageText }
