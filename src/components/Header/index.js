import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>

      <button type="button" className="logout-button" onClick={clickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
