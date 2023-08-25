import styled from 'styled-components'

export const OuterVideoDetails = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#f9f9f9')};
`
export const BlueBtn = styled.button`
  color: #2563eb;
`

export const WhiteBtn = styled.button`
  color: #64748b;
`
