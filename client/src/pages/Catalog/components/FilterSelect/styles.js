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
      border-bottom-color: #b0bcc2;
    }
  }

  .MuiSelect-root {
    padding-left: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #838383;
  }

  .MuiSelect-icon {
    transition: transform 0.3s ease;
  }
`

export const SelectItem = styled(MenuItem)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #838383;
`
