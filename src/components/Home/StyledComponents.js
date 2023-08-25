import styled from 'styled-components'

export const OuterHome = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
`

export const BannerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
`
