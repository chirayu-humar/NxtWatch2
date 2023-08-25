import styled from 'styled-components'

const OuterTrending = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
`

export default OuterTrending
