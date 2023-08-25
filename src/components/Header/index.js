import './index.css'
import {WiMoonWaxingCrescent3, WiDaySunny} from 'react-icons/wi'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import SpecialContext from '../../context/SpecialContext'

const Header = props => {
  const LogOutFunction = () => {
    console.log('logout')
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SpecialContext.Consumer>
      {value => {
        const {isDark, changeTheMode} = value
        const headerClass = isDark ? 'DarkHeader' : 'LightHeader'
        return (
          <div className={`outerHeader ${headerClass}`}>
            <div className="logoContainer">
              <Link to="/">
                {!isDark && (
                  <img
                    alt="website logo"
                    className="websiteLogo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  />
                )}
                {isDark && (
                  <img
                    alt="website logo"
                    className="websiteLogo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  />
                )}
              </Link>
            </div>
            <ul className="allBtnsContainer">
              <li key="firstBtn">
                <button
                  onClick={changeTheMode}
                  type="button"
                  className="specialBtn"
                  data-testid="theme"
                >
                  {!isDark && (
                    <WiMoonWaxingCrescent3 className="profileClass" />
                  )}
                  {isDark && <WiDaySunny className="sumIcon profileClass" />}
                </button>
              </li>
              <li key="secondBtn">
                <button className="specialBtn">
                  <img
                    alt="profile"
                    className="profileClass"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  />
                </button>
              </li>
              {/* logout btn container started */}
              <li key="thirdBtn">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="trigger-button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div className="outerPopup">
                      <div className="popupInner1">
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <div className="popupInner1">
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={() => close()}
                        >
                          cancel
                        </button>
                        <button
                          type="button"
                          className="trigger-button"
                          onClick={LogOutFunction}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
              {/* logout btn container ended */}
            </ul>
          </div>
        )
      }}
    </SpecialContext.Consumer>
  )
}

export default withRouter(Header)
