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

class NotFound extends Component {
  state = {isBannerPresent: true, videosList: [], isLoading: false}

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
    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const newVideosList = data.videos.map(eachItem =>
      this.FormatTheVideoDetails(eachItem),
    )
    this.setState({
      videosList: newVideosList,
      isLoading: false,
    })
  }

  render() {
    const {isBannerPresent, videosList, isLoading} = this.state
    return (
      <SpecialContext.Consumer>
        {value => {
          const {isDark, changeTheMode} = value
          return (
            <>
              <Header />
              <div className="homeOuter">
                <div className="bottomLargerContainer">
                  {/* first cont */}
                  <div className="bottomLargerFirst">
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
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                          />
                          <img
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                          />
                          <img
                            className="socialIcons"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                          />
                        </div>
                        <div className="firstInnerDivTemp">
                          <p>
                            Enjoy! Now to see your channels and recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* second cont */}
                  <div className="bottomLargerSecond">
                    {/* banner started */}
                    {isBannerPresent && (
                      <div className="bannerContainerNotfound">
                        <img
                          alt="not found"
                          className="notFound"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                        />
                        <h1>Page Not Found</h1>
                        <p>
                          we are sorry, the page you requested could not be
                          found.
                        </p>
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
                    {/* video container ended */}
                  </div>
                  {/* third cont */}
                  {/* fourth div */}
                </div>
              </div>
            </>
          )
        }}
      </SpecialContext.Consumer>
    )
  }
}

export default NotFound
