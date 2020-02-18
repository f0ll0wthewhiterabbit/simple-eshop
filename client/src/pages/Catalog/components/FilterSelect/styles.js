import styled from 'styled-components'
import { FormControl, MenuItem } from '@material-ui/core'

export const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 28px;

  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0;
  }
`

export const SelectFormControl = styled(FormControl)`
  min-width: 60px;
  margin-left: 10px;

  .MuiInputBase-root {
    font-size: 1.2rem;

    &::after {
      border-bottom-color: ${props => props.theme.colors.font.bold};
    }

    &::before {
      border-bottom-color: ${props => props.theme.colors.font.regular};
    }

    &:hover {
      &::before {
        border-bottom-color: ${props => props.theme.colors.font.bold};
      }
    }
  }

  .MuiSelect-root {
    padding-left: 8px;
    font-family: ${props => props.theme.font.family};
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.colors.font.regular};
  }

  .MuiSelect-icon {
    transition: transform 0.3s ease;
    color: ${props => props.theme.colors.font.regular};
  }
`

export const SelectItem = styled(MenuItem)`
  font-family: ${props => props.theme.font.family};
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme.colors.font.regular};
`
