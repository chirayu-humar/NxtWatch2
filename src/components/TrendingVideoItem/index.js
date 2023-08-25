import './index.css'
import {Link} from 'react-router-dom'

const TrendingVideoItem = props => {
  const {details} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = details
  const {name, profileImageUrl} = channel
  return (
    <li className="videoItemOuterTrending">
      <Link to={`/videos/${id}`}>
        <div className="thumbnailContainer">
          <img
            alt="video thumbnail"
            className="thumbnailImage"
            src={thumbnailUrl}
          />
        </div>
        <div className="detailsContainer">
          <div className="videoProfileContainer">
            <img className="profileOfVideo" src={profileImageUrl} />
          </div>
          <div className="contentContainer">
            <p>{title}</p>
            <p>{name}</p>
            <div className="informationDiv">
              <p>{viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default TrendingVideoItem
