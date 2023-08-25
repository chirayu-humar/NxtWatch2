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
import TrendingVideoItem from '../TrendingVideoItem'
import OuterTrending from './StyledComponents'

class Trending extends Component {
  state = {
    isBannerPresent: true,
    videosList: [],
    isLoading: false,
    isReqSuccess: true,
  }

  componentDidMount = () => {
    console.log('fetch for trending')
    this.fetchTrendingVideos()
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

  fetchTrendingVideos = async () => {
    this.setState({
      isLoading: true,
    })
    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
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
        isLoading: false,
        isReqSuccess: false,
      })
    }
  }

  render() {
    const {isBannerPresent, videosList, isLoading, isReqSuccess} = this.state
    return (
      <SpecialContext.Consumer>
        {value => {
          const {isDark, changeTheMode} = value
          return (
            <>
              <Header />
              <OuterTrending isDark={isDark} data-testid="trending">
                <div className="bottomLargerContainerTrending">
                  {/* first cont */}
                  <div className="bottomLargerFirstTrending">
                    <div className="bottomLargerFirstInner1">
                      <div className="firstChildSideContainer">
                        <Link to="/">
                          <div className="firstInnerDivTemp">
                            <AiFillHome />
                            <p>Home</p>
                          </div>
                        </Link>
                        <Link to="/trending">
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
                  <div className="bottomLargerSecondTrending">
                    {/* banner started */}
                    {isBannerPresent && (
                      <div className="bannerContainer">
                        <h1>Trending</h1>
                      </div>
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
                    <div className="videoContainer">
                      {/* search box ended */}
                      {/* video items container started */}
                      <ul className="specialVideoContainerTrending">
                        {videosList.length === 0 && (
                          <li>
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                          </li>
                        )}
                        {!isReqSuccess && (
                          <li>
                            {!isDark && (
                              <img
                                alt="failure view"
                                className="notFound"
                                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                              />
                            )}
                            {isDark && (
                              <img
                                alt="failure view"
                                className="notFound"
                                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                              />
                            )}
                            <h1>Oops! Something Went Wrong</h1>
                            <p>We are having some trouble</p>
                            <button
                              onClick={this.fetchTrendingVideos}
                              type="button"
                            >
                              Retry
                            </button>
                          </li>
                        )}
                        {videosList.map(eachItem => (
                          <TrendingVideoItem
                            key={eachItem.id}
                            details={eachItem}
                          />
                        ))}
                      </ul>
                      {/* video items container ended */}
                    </div>
                    {/* video container ended */}
                  </div>
                  {/* third cont */}
                  {/* fourth div */}
                </div>
              </OuterTrending>
            </>
          )
        }}
      </SpecialContext.Consumer>
    )
  }
}

export default Trending
