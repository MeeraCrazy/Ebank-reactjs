import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const apiUrl = `https://apis.ccbp.in/ebank/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="input-container">
              <label className="label-input" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                className="input-text"
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
              />
            </div>
            <div className="input-container">
              <label className="label-input" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                id="pin"
                value={pin}
                className="input-text"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
