import './index.css'
import {GrClose} from 'react-icons/gr'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'
import SpecialContext from '../../context/SpecialContext'
import Header from '../Header'
import GamingVideoItem from '../GamingVideoItem'
import {OuterVideoDetails, BlueBtn, WhiteBtn} from './StyledComponents'

class Gaming extends Component {
  state = {
    isBannerPresent: true,
    videosList: {},
    channel: {},
    isLoading: true,
    objectToBeSent: {},
    isReqSuccess: true,
  }

  componentDidMount = () => {
    console.log('fetch for trending')
    this.fetchTrendingVideos()
  }

  FormatChannel = object => ({
    name: object.name,
    profileImageUrl: object.profile_image_url,
    subscriberCount: object.subscriber_count,
  })

  FormatTheVideoDetails = object => ({
    id: object.video_details.id,
    thumbnailUrl: object.video_details.thumbnail_url,
    title: object.video_details.title,
    viewCount: object.video_details.view_count,
    publishedAt: object.video_details.published_at,
    videoUrl: object.video_details.video_url,
    description: object.video_details.description,
  })

  fetchTrendingVideos = async () => {
    this.setState({
      isLoading: true,
    })
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
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
    if (response.ok) {
      const newVideoDetails = this.FormatTheVideoDetails(data)
      const channelDetails = this.FormatChannel(data.video_details.channel)
      console.log(newVideoDetails)
      this.setState({
        videosList: newVideoDetails,
        isLoading: false,
        channel: channelDetails,
      })
    } else {
      this.setState({
        isReqSuccess: false,
        isLoading: false,
      })
    }
  }

  render() {
    const {
      isBannerPresent,
      videosList,
      isLoading,
      channel,
      isReqSuccess,
    } = this.state
    console.log(isLoading)
    const {
      id,
      thumbnailUrl,
      title,
      viewCount,
      publishedAt,
      videoUrl,
      description,
    } = videosList
    const {name, profileImageUrl, subscriberCount} = channel
    const divStyle = {
      width: '100%',
      display: 'flex',
      'flex-shrink': '1',
    }
    return (
      <SpecialContext.Consumer>
        {value => {
          const {
            isDark,
            savedVideosList,
            addToSavedVideos,
            removeFromSavedVideos,
            addReaction,
            removeReaction,
            reactionList,
          } = value

          const addThisVideo = () => {
            const objectToBeSent = {
              id: videosList.id,
              thumbnailUrl: videosList.thumbnailUrl,
              title: videosList.title,
              viewCount: videosList.viewCount,
              publishedAt: videosList.publishedAt,
              videoUrl: videosList.videoUrl,
              description: videosList.description,
              channel: {
                name: channel.name,
                profileImageUrl: channel.profileImageUrl,
                subscriberCount: channel.subscriberCount,
              },
            }
            addToSavedVideos(objectToBeSent)
          }

          const removeThisVideo = () => {
            removeFromSavedVideos(videosList)
          }

          const isVideoAlreadySaved = savedVideosList.some(
            obj => obj.id === videosList.id,
          )

          const reactionOnVideo = reactionList.filter(
            obj => obj.id === videosList.id,
          )

          /* console.log('reactionONVideo:')
          console.log(reactionOnVideo)
          console.log(reactionOnVideo[0]) */

          let reactionType
          if (reactionOnVideo.length !== 0) {
            reactionType = reactionOnVideo[0].reactionType
            console.log(reactionType)
          }

          const LikeThisVideo = () => {
            addReaction(id, 'LIKED')
          }

          const DisLikeThisVideo = () => {
            addReaction(id, 'DISLIKED')
          }

          const removeTheReaction = () => {
            removeReaction(id)
          }

          return (
            <>
              <Header />
              <OuterVideoDetails isDark={isDark} data-testid="videoItemDetails">
                <div className="bottomLargerContainerVideoDetails">
                  {/* first cont */}
                  <div className="bottomLargerFirstVideoDetails">
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
                  <div className="bottomLargerSecond">
                    {/* banner started */}
                    {isBannerPresent && (
                      <div className="bannerContainer">
                        <ReactPlayer style={{width: '50px'}} url={videoUrl} />
                      </div>
                    )}
                    {!isReqSuccess && (
                      <div className="bannerContainer">
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
                        <p>
                          We are having some trouble to complete your request.
                          Please try again.
                        </p>
                        <button
                          onClick={this.fetchTrendingVideos}
                          type="button"
                        >
                          Retry
                        </button>
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
                      <div className="specialVideoContainer">
                        <div className="childForSpecial">
                          <p>{title}</p>
                          <div className="rowContainer">
                            <p>{viewCount}</p>
                            <p>{publishedAt}</p>
                          </div>
                          <div className="rowContainer">
                            {reactionType === 'DISLIKED' && (
                              <>
                                <WhiteBtn
                                  style={{color: '#64748b'}}
                                  onClick={LikeThisVideo}
                                  type="button"
                                >
                                  Like
                                </WhiteBtn>
                                <BlueBtn
                                  onClick={removeTheReaction}
                                  type="button"
                                  style={{color: '#2563eb'}}
                                >
                                  Dislike
                                </BlueBtn>
                              </>
                            )}
                            {reactionType === undefined && (
                              <>
                                <WhiteBtn
                                  style={{color: '#64748b'}}
                                  onClick={LikeThisVideo}
                                  type="button"
                                >
                                  Like
                                </WhiteBtn>
                                <WhiteBtn
                                  onClick={DisLikeThisVideo}
                                  type="button"
                                  style={{color: '#64748b'}}
                                >
                                  Dislike
                                </WhiteBtn>
                              </>
                            )}
                            {reactionType === 'LIKED' && (
                              <>
                                <BlueBtn
                                  onClick={removeTheReaction}
                                  type="button"
                                  style={{color: '#2563eb'}}
                                >
                                  Like
                                </BlueBtn>
                                <WhiteBtn
                                  type="button"
                                  onClick={DisLikeThisVideo}
                                  style={{color: '#64748b'}}
                                >
                                  Dislike
                                </WhiteBtn>
                              </>
                            )}
                            {!isVideoAlreadySaved && (
                              <button type="button" onClick={addThisVideo}>
                                save
                              </button>
                            )}
                            {isVideoAlreadySaved && (
                              <button type="button" onClick={removeThisVideo}>
                                saved
                              </button>
                            )}
                          </div>
                          <hr />
                          <div className="rowContainer">
                            <img alt="channel logo" src={profileImageUrl} />
                            <div>
                              <p>{name}</p>
                              <p>{subscriberCount}</p>
                            </div>
                          </div>
                          <p>{description}</p>
                        </div>
                      </div>
                      {/* video items container ended */}
                    </div>
                    {/* video container ended */}
                  </div>
                  {/* third cont */}
                  {/* fourth div */}
                </div>
              </OuterVideoDetails>
            </>
          )
        }}
      </SpecialContext.Consumer>
    )
  }
}

export default Gaming
