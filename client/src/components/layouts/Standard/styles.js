import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const Main = styled.main`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 250px;
  background-color: ${props => props.theme.colors.background.main};
  transition: background-color 0.3s ease-out;
`
