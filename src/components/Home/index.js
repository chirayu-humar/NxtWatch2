import './index.css'
import {GrClose} from 'react-icons/gr'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import SpecialContext from '../../context/SpecialContext'
import Header from '../Header'
import VideoItem from '../VideoItem'
import {OuterHome, BannerContainer} from './StyledComponents'

class Home extends Component {
  state = {
    searchInput: '',
    isBannerPresent: true,
    videosList: [],
    isLoading: false,
    isReqSuccess: true,
  }

  componentDidMount = () => {
    this.fetchTheData()
  }

  fetchTheData = async () => {
    this.setState({
      isLoading: true,
    })
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const newVideosList = data.videos.map(eachItem =>
        this.FormatTheVideoDetails(eachItem),
      )
      this.setState({
        videosList: newVideosList,
        isLoading: false,
      })
    } else {
      this.setState({
        isReqSuccess: false,
        isLoading: false,
      })
    }
  }

  removeTheBanner = () => {
    this.setState({
      isBannerPresent: false,
    })
  }

  changeTheSearchInput = event => {
    const {value} = event.target
    this.setState({
      searchInput: value,
    })
  }

  FormatTheVideoDetails = object => ({
    channel: {
      name: object.channel.name,
      profileImageUrl: object.channel.profile_image_url,
    },
    id: object.id,
    publishedAt: object.published_at,
    thumbnailUrl: object.thumbnail_url,
    title: object.title,
    viewCount: object.view_count,
  })

  render() {
    const {
      isBannerPresent,
      searchInput,
      videosList,
      isLoading,
      isReqSuccess,
    } = this.state
    return (
      <SpecialContext.Consumer>
        {value => {
          const {isDark, changeTheMode} = value
          return (
            <>
              <Header />
              <OuterHome data-testid="home" isDark={isDark}>
                <div className="bottomLargerContainerHome">
                  {/* first cont */}
                  <div className="bottomLargerFirstHome">
                    <div className="bottomLargerFirstInner1">
                      <div className="firstChildSideContainer">
                        <Link to="/">
                          <div className="firstInnerDivTemp">
                            <AiFillHome />
                            <p>Home</p>
                          </div>
                        </Link>
                        <Link to="trending">
                          <div className="firstInnerDivTemp">
                            <AiTwotoneFire />
                            <p>Trending</p>
                          </div>
                        </Link>
                        <Link to="/gaming">
                          <div className="firstInnerDivTemp">
                            <SiYoutubegaming />
                            <p>Gaming</p>
                          </div>
                        </Link>
                        <Link to="/saved-videos">
                          <div className="firstInnerDivTemp">
                            <p>Saved Videos</p>
                          </div>
                        </Link>
                      </div>
                      <div className="firstChildSideContainer">
                        <div className="firstInnerDivTemp">
                          <p>Contact Us</p>
                        </div>
                        <div className="firstInnerDivTemp">
                          <img
                            alt="facebook logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                          />
                          <img
                            alt="twitter logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                          />
                          <img
                            alt="linked in logo"
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                          />
                        </div>
                        <div className="firstInnerDivTemp">
                          <p>
                            Enjoy! Now to see your channels and recommendations!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* second cont */}
                  <div className="bottomLargerSecondHome">
                    {/* banner started */}
                    {isBannerPresent && (
                      <BannerContainer
                        data-testid="banner"
                        className="bannerContainer"
                      >
                        {/* first  */}
                        <div className="firstInnerBanner">
                          <div className="firstInnerLogoContainer">
                            <img
                              alt="nxt watch logo"
                              className="bannerLogo"
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            />
                          </div>
                          <div>
                            <button
                              aria-label="removeTheBanner"
                              type="button"
                              data-testid="close"
                              onClick={this.removeTheBanner}
                            >
                              <GrClose />
                            </button>
                          </div>
                        </div>
                        {/* second  */}
                        <div className="firstInnerBanner">
                          <div className="secondTemp">
                            <p>Buy Nxt Watch Premium</p>
                          </div>
                        </div>
                        {/* third  */}
                        <div>
                          <button className="button">GET IT NOW</button>
                        </div>
                        {/* fourth  */}
                      </BannerContainer>
                    )}
                    {/* banner ended */}
                    {isLoading && (
                      <div className="loader-container" data-testid="loader">
                        <Loader
                          type="ThreeDots"
                          color="#ffffff"
                          height="50"
                          width="50"
                        />
                      </div>
                    )}
                    {/* video container started */}
                    <div className="videoContainerHome">
                      <div className="searchBox">
                        <input
                          onChange={this.changeTheSearchInput}
                          className="searchInput"
                          type="search"
                        />
                        <button
                          data-testid="searchButton"
                          onClick={this.fetchTheData}
                          className="searchBtn"
                          type="button"
                        >
                          search
                        </button>
                      </div>
                      {/* search box ended */}
                      {/* video items container started */}
                      <ul className="specialVideoContainerHome">
                        {videosList.length === 0 && (
                          <li>
                            <img
                              alt="no videos"
                              className="notFound"
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                            />
                            <h1>No Search results found</h1>
                            <p>
                              Try different key words or remove search filter
                            </p>
                            <button onClick={this.fetchTheData} type="button">
                              Retry
                            </button>
                          </li>
                        )}
                        {!isReqSuccess && (
                          <li>
                            <img
                              className="notFound"
                              alt="failure view"
                              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                            />
                            <h1>Oops! Something Went Wrong</h1>
                            <p>We are having some trouble</p>
                            <button onClick={this.fetchTheData} type="button">
                              Retry
                            </button>
                          </li>
                        )}
                        {videosList.map(eachItem => (
                          <VideoItem key={eachItem.id} details={eachItem} />
                        ))}
                      </ul>
                      {/* video items container ended */}
                    </div>
                    {/* video container ended */}
                  </div>
                  {/* third cont */}
                  {/* fourth div */}
                </div>
              </OuterHome>
            </>
          )
        }}
      </SpecialContext.Consumer>
    )
  }
}

export default Home
