import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  ${props => props.theme.breakpoints.up('sm')} {
    justify-content: space-between;
  }
`

export default Wrapper
