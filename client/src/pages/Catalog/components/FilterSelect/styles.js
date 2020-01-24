import styled from 'styled-components'
import { FormControl } from '@material-ui/core'

export const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 28px;

  ${props => props.theme.breakpoints.up('sm')} {
    position: absolute;
    top: 49px;
    right: 32px;
    margin-bottom: 0;
  }
`

export const SelectFormControl = styled(FormControl)`
  min-width: 60px;
  margin-left: 10px;

  .MuiInputBase-root {
    font-size: 1.2rem;
  }

  .MuiSelect-root {
    padding-left: 8px;
  }
`
